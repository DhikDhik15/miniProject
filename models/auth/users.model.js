module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      email: {
        type: Sequelize.STRING(255)
      },
      password: {
        type: Sequelize.STRING(255)
      }
  
    },
    {
        //Mengunci nama table
        freezeTableName: true,
    });
  
    return Users;
  };
  