module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Category;
};
