module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payment", {
    id_transaction: {
      type: Sequelize.INTEGER
    },
    id_status_payment: {
      type: Sequelize.INTEGER
    },
    payment_method: {
      type: Sequelize.ENUM('transfer bank','COD')
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Payment;
};
