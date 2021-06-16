module.exports = {
  HOST: "localhost",
  USER: "dhika",
  PASSWORD: "cliquers150193",
  DB: "mini_project",
  dialect: "postgres",
  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
