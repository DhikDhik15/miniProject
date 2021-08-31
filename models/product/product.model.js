module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Product;
};
