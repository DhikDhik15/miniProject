const express = require("express");
const bodyParser = require("body-parser");
const cors = require ("cors");

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
