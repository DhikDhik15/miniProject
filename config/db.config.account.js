'use strict';
var pg = require('pg');
// const dotenv = require('dotenv');
// dotenv.config();
//
//  /*create connection*/
//  var pool = pg.connect({
//    host: process.env.HOST_MINIPROJECT,
//    user: process.env.USER_MINIPROJECT,
//    password: process.env.PASSWORD_MINIPROJECT,
//    database: process.env.DB_MINIPROJECT,
//    port: process.env.DB_PORT_MINIPROJECT
//  });
//
//  pool.getConnection((err) => {
//    if (err) throw err;
//    console.log('DB MINI PROJECT TERKONEKSI');
//  })
//
//  module.exports = pool;

module.exports = {
  HOST: "localhost",
  USER: "dhika",
  PASSWORD: "cliquers150193",
  DB: "mini_project_account",
  dialect: "postgres",
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
