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
    description: {
      type: Sequelize.STRING
    }
    ,
    expired: {
      type: Sequelize.DATEONLY
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Product;
};
