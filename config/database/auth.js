// configurasi untuk sequilize
'use strict';
var dotevn = require('dotenv');
dotevn.config();

module.exports = {
    HOST: process.env.HOST_MINIPROJECT,
    USER: process.env.USER_MINIPROJECT,
    PASSWORD: process.env.PASSWORD_MINIPROJECT,
    DB: process.env.DB_MINIPROJECT_AUTH,
    dialect: "postgres", //ini akan memakai query nya dari siapa ?
    pool: { //ini seperti request time out / time limit misal ada error
        max: 5,
        min: 0,
        acquire: 30000, //satuannya second
        idle: 10000
    }
}
