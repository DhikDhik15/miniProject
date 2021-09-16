module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transaction", {
    id_transaction: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    id_product: {
      type: Sequelize.INTEGER
    },
    date_order: {
      type: Sequelize.DATE
    },
    price: {
      type: Sequelize.INTEGER
    },
    qty: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    status_payment: {
      type: Sequelize.INTEGER
    }


  }, {
    //Mengunci nama table
    freezeTableName: true,
  });

  return Transaction;
};
