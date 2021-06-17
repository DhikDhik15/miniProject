module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("stock", {
    name: {
      type: Sequelize.STRING
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Stock;
};
