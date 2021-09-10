module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    id_category: {
      type: Sequelize.INTEGER
    },
    stock: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    expired: {
      type: Sequelize.DATEONLY
    },
    barcode: {
      type: Sequelize.INTEGER
    },
    id_supplier: {
      type: Sequelize.INTEGER
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Product;
};
