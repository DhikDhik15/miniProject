const { district } = require('../models/account');
const express = require('express');
const app = express();
const multer = require ('multer');
const uploadsP = require('../middleware/products')
var path = require('path');


module.exports = function (app) {


  var province = require('../controllers/services/Account/province');
  var account = require('../controllers/services/Account/account');
  var auth = require('../controllers/services/Auth/users');
  var district = require('../controllers/services/Account/district');
  var product = require('../controllers/services/Product/product');
  var category = require('../controllers/services/Product/category');

  
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

  app.route('/product', uploadsP, product.addProduct);
  
  app.route('/category').post(category.addCategory);
  

}
