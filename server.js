const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require ("cors");
const Sequelize = require("sequelize");
dbAccount = require('./models/account/index');

const app = express();
var corsOption = {
  origin: "http://localhost:8001"
};

app.use(cors(corsOption));

/*parse requests of content-type - application/json*/
app.use(express.json());

/*parse requests of content-type - application/x-www-form-urlencoded*/
app.use(express.urlencoded({
  extended: true
}));

dbAccount.sequelize.sync();

/*Example simple route*/
app.get("/", (req, res) => {
  res.json({
    message: "welcome to project NodeJS and Postgresql"
  });
});

/*config PORT*/
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Running On PORT ${PORT}.`);
});
