module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    id_category: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER
    },
    images: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Product;
};
