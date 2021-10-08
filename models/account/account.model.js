
module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    username: {
      type: Sequelize.STRING,
      required: [true, "Please enter your name"]
    },
    address: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.INTEGER
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
      type: Sequelize.STRING,
      required: [true, "Please input your email"],
      unique: true      
    },
    password: {
      type: Sequelize.STRING,
      required: [true, "Please input your password"],
      maxLength: [8, "input max 8 characters"],
      minLength: [6, "input minimal 6 characters"],
      select: false
    },
    token: {
      type: Sequelize.STRING
    }

  },
  {
      //Mengunci nama table
      freezeTableName: true,
  });
  return Account;
};
