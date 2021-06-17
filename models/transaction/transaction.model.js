module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    id_cart: {
      type: Sequelize.INTEGER
    },
    id_user: {
      type: Sequelize.INTEGER
    }

  }, {
    //Mengunci nama table
    freezeTableName: true,
  });

  return Transaction;
};