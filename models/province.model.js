module.exports = (sequelize, Sequelize) => {
  const Province = sequelize.define("province", {
    name: {
      type: Sequelize.STRING
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Province;
};
