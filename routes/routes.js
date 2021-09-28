const express = require('express');
const app = express();
const uploadsP = require('../middleware/products');
const uploadOP = require('../middleware/orderProduct');
const uploadUs = require('../middleware/account');
const mongoUpload = require('../middleware/mongo/uploadProduct');
const orderUpload = require('../middleware/mongo/uploadOrderProduct');

module.exports = function (app) {
  
  /*BALANCE DATA (psql)*/ 
  const province = require('../controllers/services/Account/province');
  const account = require('../controllers/services/Account/account');
  const auth = require('../controllers/services/Auth/users');
  const district = require('../controllers/services/Account/district');
  const product = require('../controllers/services/Product/product');
  const category = require('../controllers/services/Product/category');
  const supplier = require('../controllers/services/Product/supplier');
  const opname = require('../controllers/services/Product/opnameStock');
  const orderProduct = require('../controllers/services/Product/orderProduct');
  const transaction = require('../controllers/services/Transaction/paymentMethod');
  const order = require('../controllers/services/Transaction/order');
  const status = require('../controllers/services/Transaction/statusTransaction');
  const reportBuy = require('../controllers/services/Report/reportBuy');
 
  /*MERCHANT DATA (mongo)*/ 
  const Cart = require('../controllers/services/Transaction/mongo/carts');
  const Product = require('../controllers/services/Product/mongo/product');
  const Category = require('../controllers/services/Product/mongo/category');
  const Supplier = require('../controllers/services/Product/mongo/supplier');
  const Order = require('../controllers/services/Product/mongo/orderProduct');
  const Buyer = require('../controllers/services/Transaction/mongo/buyer');

/*AUTH*/ 
  app.route('/').get(auth.getUser);
  app.route('/login').post(auth.addUsers);
  app.route('/token').post(auth.tokenUsers);
  app.route('/admin').get(auth.getAdmin);
  app.route('/logout').get(auth.logOut);

/*PROVINCE*/ 
  app.route('/province').post(province.addProvince);
  app.route('/getProvince').get(province.getProvince);
  app.route('/putProvince').put(province.putProvince);
  app.route('/deleteProvince').delete(province.deleteProvince);

/*ACCOUNT*/ 
  app.route('/account').post(uploadUs, account.addAccount);
  app.route('/getAccount').get(account.getAccount);
  app.route('/putAccount').put(uploadUs, account.putAccount);
  app.route('/deleteAccount').delete(account.deleteAccount);

/*DISTRICT*/ 
  app.route('/district').post(district.addDistrict);
  app.route('/getDistrict/:id').get(district.getDistrictByID);
  app.route('/getDistrict').get(district.getDistrict);
  app.route('/putDistrict').put(district.putDistrict);

/*PRODUCT*/ 
  app.route('/product').post(uploadsP,product.addProduct);
  app.route('/getProduct').get(product.getProduct);
  app.route('/getProductById').get(product.getProductByID);
  app.route('/reportStock').get(product.getReportStock);
  app.route('/putProduct').put(uploadsP, product.putProduct);
  app.route('/deleteProduct').delete(product.deleteProduct);

  app.route('/products').post(mongoUpload.upload.single('image'),Product.createProduct )
  app.route('/getProducts').get(Product.getProducts);
  app.route('/getProducts/:id').get(Product.getProductById);
  app.route('/deleteProducts/:id').delete(Product.removeProduct);

/*OPNAME PRODUCT*/ 
  app.route('/getOpname').get(opname.getOpname);
  app.route('/getOpnameById').get(opname.getOpnameById);
  app.route('/opname').post(opname.addOpname);

/*CATEGORY PRODUCT*/ 
  app.route('/category').post(category.addCategory);
  app.route('/getCategory').get(category.getCategory);
  app.route('/putCategory').put(category.putCategory);
  app.route('/deleteCategory').delete(category.deleteCategory);

  app.route('/').post(Category.createCategory);
  app.route('/get').get(Category.getCategory);

/*SUPPLIER*/ 
  app.route('/supplier').post(supplier.addSupplier);
  app.route('/getSupplier').get(supplier.getSupplier);
  app.route('/putSupplier').put(supplier.putSupplier);

  app.route('/add').post(Supplier.addSupplier);
  app.route('/getS').get(Supplier.getSupplier); 

/*ORDER PRODUCT*/ 
  app.route('/orderProduct').post(uploadOP, orderProduct.addOrderProduct);
  app.route('/getOrderProduct').get(orderProduct.getOrderProduct);
  app.route('/getOrderProductByDate').get(orderProduct.getOrderProductbyDate);
  app.route('/putOrderProduct').put(uploadOP, orderProduct.putOrderProduct);

  app.route('/addOrder').post(orderUpload.upload.single('image'), Order.createOrder);
  app.route('/getOrder').get(Order.getOrder);

/*PAYMENT METHOD*/ 
  app.route('/paymentMethod').post(transaction.addMethod);
  app.route('/getPaymentMethod').get(transaction.getMethod);
  
/*PAYMENT STATUS*/ 
  app.route('/status').post(status.addStatus);
  app.route('/getStatus').get(status.getStatus);

/*REPORT*/
  app.route('/reportBuy').get(reportBuy.getReportBuy);
  app.route('/reportBuyByDate').get(reportBuy.getReporyByDate);

/*CART*/
  app.route('/addCart').post(Cart.addItemToCart);
  app.route('/getCart').get(Cart.getCart);
  app.route('/deleteCart').delete(Cart.emptyCart);
  app.route('/deleteItem').delete(Cart.removeItemCart);

  /*ORDER*/
  app.route('/order').get(order.getProduct);

/*TRANSACTION*/
  app.route('/transaction').post(Buyer.addTransaction);
  app.route('/getTransaction').get(Buyer.getTransaction);

}
