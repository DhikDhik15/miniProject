module.exports = (sequelize, Sequelize) => {
  const StatusTransaction = sequelize.define("status_transaction", {
    id_transaction: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.ENUM('success','failed','pending')
    }

  }, {
    //Mengunci nama table
    freezeTableName: true,
  });

  return StatusTransaction;
};
