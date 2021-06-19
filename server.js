const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const cors = require ("cors");
const Sequelize = require("sequelize");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const apiDocumentation = require('./miniProject.json');

//connect to models
dbAccount = require('./models/account/index');
dbProduct = require('./models/product/index');
dbTransaction = require('./models/transaction/index');
dbPayment = require('./models/payment/index');

const app = express();
var corsOption = {
  origin: "http://localhost:8001"
};

/* Swagger */
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Library Mini-Project',
      version: '1.0.0'
    }
  },
  apis: ['server.js']
}; 
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/miniProject', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

// CORS
app.use(cors(corsOption));

/*parse requests of content-type - application/json*/
app.use(express.json());

/*parse requests of content-type - application/x-www-form-urlencoded*/
app.use(express.urlencoded({
  extended: true
}));

const routes = require('./routes/routes');
routes(app);

//sync to sequilize
dbAccount.sequelize.sync();
dbProduct.sequelize.sync();
dbTransaction.sequelize.sync();
dbPayment.sequelize.sync();


/*config PORT*/
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Running On PORT ${PORT}.`);
});
