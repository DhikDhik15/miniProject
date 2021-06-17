module.exports = (sequelize, Sequelize) => {
  const District = sequelize.define("district", {
    name: {
      type: Sequelize.STRING
    },
    id_province: {
      type: Sequelize.INTEGER
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return District;
};
