module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
    id_product: {
      type: Sequelize.INTEGER
    },
    id_user: {
      type: Sequelize.INTEGER
    },
    count: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER
    }

  }, {
    //Mengunci nama table
    freezeTableName: true,
  });

  return Cart;
};
