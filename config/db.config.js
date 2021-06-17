'use strict';
var pg = require('pg');
const dotenv = require('dotenv');
const { Pool } = require('postgres-pool');
dotenv.config();

 /*create connection*/
 var pool = new Pool({
   host: process.env.HOST_MINIPROJECT,
   user: process.env.USER_MINIPROJECT,
   password: process.env.PASSWORD_MINIPROJECT,
   database: process.env.DB_MINIPROJECT,
   port: process.env.DB_PORT_MINIPROJECT,
   dialect: process.env.DIALECT

 });

 pool.connect((err) => {
   if (err) throw err;
   console.log('DB MINI PROJECT TERKONEKSI');
 })

 module.exports = pool;
