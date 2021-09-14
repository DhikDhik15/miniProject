'use strict';
const dbConfig = require("../../config/database/product");

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

db.product = require("./product.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.opname = require("./opnameProduct.model.js")(sequelize, Sequelize);
db.supplier = require("./supplier.model")(sequelize, Sequelize);
db.order_product = require("./orderProduct.model")(sequelize, Sequelize);

module.exports = db;
