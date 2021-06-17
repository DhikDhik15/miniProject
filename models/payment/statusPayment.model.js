module.exports = (sequelize, Sequelize) => {
  const Status_Payment = sequelize.define("status_payment", {
    name: {
      type: Sequelize.ENUM('success','failed', 'pending')
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Status_Payment;
};
