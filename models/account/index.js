'use strict';
const dbConfig = require("../../config/database/account");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.province = require("./province.model.js")(sequelize, Sequelize);
db.district = require("./district.model.js")(sequelize, Sequelize);
db.account = require("./account.model.js")(sequelize, Sequelize);

module.exports = db;
