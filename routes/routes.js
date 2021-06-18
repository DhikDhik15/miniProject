module.exports = function (app) {
  var province = require('../controllers/services/Account/province');

  app.route('/province').post(province.addProvince);
}
