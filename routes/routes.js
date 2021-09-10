const { district } = require('../models/account');
const express = require('express');
const app = express();
const uploadsP = require('../middleware/products')


module.exports = function (app) {


  const province = require('../controllers/services/Account/province');
  const account = require('../controllers/services/Account/account');
  const auth = require('../controllers/services/Auth/users');
  const district = require('../controllers/services/Account/district');
  const product = require('../controllers/services/Product/product');
  const category = require('../controllers/services/Product/category');
  const supplier = require('../controllers/services/Product/supplier');


  app.route('/').get(auth.getUser);
  app.route('/login').post(auth.addUsers);
  app.route('/token').post(auth.tokenUsers);
  app.route('/admin').get(auth.getAdmin);
  app.route('/logout').get(auth.logOut);

  app.route('/province').post(province.addProvince);
  app.route('/getProvince').get(province.getProvince);
  app.route('/putProvince').put(province.putProvince);
  app.route('/deleteProvince').delete(province.deleteProvince);

  app.route('/account').post(account.addAccount);
  app.route('/getAccount').get(account.getAccount);
  app.route('/putAccount').put(account.putAccount);
  app.route('/deleteAccount').delete(account.deleteAccount);

  app.route('/district').post(district.addDistrict);
  app.route('/getDistrict/:id').get(district.getDistrict);

  app.route('/product').post(uploadsP,product.addProduct);
  app.route('/getProduct').get(product.getProduct);
  app.route('/reportStock').get(product.getReportStock);
  app.route('/putProduct').put(product.putProduct);
  app.route('/deleteProduct').delete(product.deleteProduct);

  app.route('/category').post(category.addCategory);
  app.route('/getCategory').get(category.getCategory);
  app.route('/putCategory').put(category.putCategory);
  app.route('/deleteCategory').delete(category.deleteCategory);

  app.route('/supplier').post(supplier.addSupplier);
  app.route('/getSupplier').get(supplier.getSupplier);
  app.route('/putSupplier').put(supplier.putSupplier);


}
