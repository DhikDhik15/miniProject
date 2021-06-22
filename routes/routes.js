module.exports = function (app) {
  var province = require('../controllers/services/Account/province');
  var account = require('../controllers/services/Account/account');
  var auth = require('../controllers/services/Auth/users');

  app.route('/').get(auth.getUser);
  app.route('/login').post(auth.addUsers);
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
}
