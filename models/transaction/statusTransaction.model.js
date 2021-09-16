module.exports = (sequelize, Sequelize) => {
  const StatusTransaction = sequelize.define("status_transaction", {
    status: {
      type: Sequelize.STRING
    }

  }, {
    //Mengunci nama table
    freezeTableName: true,
  });

  return StatusTransaction;
};
