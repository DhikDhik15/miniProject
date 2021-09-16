const express = require('express');
const app = express();
const uploadsP = require('../middleware/products');
const uploadOP = require('../middleware/orderProduct');
const uploadUs = require('../middleware/account');

module.exports = function (app) {
  
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
  const status = require('../controllers/services/Transaction/statusTransaction');
  const reportBuy = require('../controllers/services/Report/reportBuy');

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
  app.route('/reportStock').get(product.getReportStock);
  app.route('/putProduct').put(uploadsP, product.putProduct);
  app.route('/deleteProduct').delete(product.deleteProduct);

/*OPNAME PRODUCT*/ 
  app.route('/getOpname').get(opname.getOpname);
  app.route('/getOpnameById').get(opname.getOpnameById);
  app.route('/opname').post(opname.addOpname);

/*CATEGORY PRODUCT*/ 
  app.route('/category').post(category.addCategory);
  app.route('/getCategory').get(category.getCategory);
  app.route('/putCategory').put(category.putCategory);
  app.route('/deleteCategory').delete(category.deleteCategory);

/*SUPPLIER*/ 
  app.route('/supplier').post(supplier.addSupplier);
  app.route('/getSupplier').get(supplier.getSupplier);
  app.route('/putSupplier').put(supplier.putSupplier);

/*ORDER PRODUCT*/ 
  app.route('/orderProduct').post(uploadOP, orderProduct.addOrderProduct);
  app.route('/getOrderProduct').get(orderProduct.getOrderProduct);
  app.route('/getOrderProductByDate').get(orderProduct.getOrderProductbyDate);
  app.route('/putOrderProduct').put(uploadOP, orderProduct.putOrderProduct);

/*PAYMENT METHOD*/ 
  app.route('/paymentMethod').post(transaction.addMethod);
  app.route('/getPaymentMethod').get(transaction.getMethod);
  
/*PAYMENT STATUS*/ 
  app.route('/status').post(status.addStatus);
  app.route('/getStatus').get(status.getStatus);

/*REPORT*/
  app.route('/reportBuy').get(reportBuy.getReportBuy);
  app.route('/reportBuyByDate').get(reportBuy.getReporyByDate);

}
