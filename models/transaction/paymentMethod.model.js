module.exports = (sequelize, Sequelize) => {
    const PaymentMethod = sequelize.define("payment_method", {
      method: {
        type: Sequelize.STRING
      }
  
    }, {
      //Mengunci nama table
      freezeTableName: true,
    });
  
    return PaymentMethod;
  };
  