'use strict';
const dbConfig = require("../../config/database/transaction");

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

db.statusTransaction = require("./statusTransaction.model.js")(sequelize, Sequelize);
db.paymentModel = require("./payment.model")(sequelize, Sequelize);
db.paymentMethod = require("./paymentMethod.model")(sequelize, Sequelize);

module.exports = db;
