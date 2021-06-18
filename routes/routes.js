module.exports = function (app) {
  var province = require('../controllers/services/Account/province');
  var account = require('../controllers/services/Account/account');

  app.route('/province').post(province.addProvince);
  app.route('/province').get(province.getProvince);
  app.route('/province').put(province.putProvince);
  app.route('/province/:id').delete(province.deleteProvince);

  app.route('/account').post(account.addAccount);
  app.route('/account').get(account.getAccount);
}
