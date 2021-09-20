module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    username: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.INTEGER(12)
     },
    image: {
      type: Sequelize.STRING
    },
    id_province: {
      type: Sequelize.INTEGER
    },
    id_district: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });

  return Account;
};
