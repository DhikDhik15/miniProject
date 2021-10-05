const express = require("express");
const bodyParser = require("body-parser");
const session = require ('express-session');
const mongoSession = require ('connect-mongodb-session')(session);
const router = express.Router();
const helmet = require('helmet');
const morgan = require('morgan');
const {MongoClient} = require('mongodb');

/*HTTPS*/ 
// const https = require ('https');
// const path = require ('path');
// const fs = require ('fs');
/*.ENV*/ 
const dotenv = require('dotenv');
/*CORS*/ 
const cors = require ("cors");
const Sequelize = require("sequelize");
/*SWAGGER*/ 
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const apiDocumentation = require('./miniProject.json');

const app = express();
var corsOption = {
  origin: "https://localhost:8001"
};

// log only 4xx and 5xx responses to console
app.use(morgan('dev', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(bodyParser.urlencoded({
  extended: true
}));
/* Helmet */ 
app.use(helmet());
/* end */

/* Call Assets 
app.use('/assets',express.static('assets'));

/*Session Connect*/
// const store= new mongoSession({
//   uri: process.env.MONGO_URL,
//   databaseName: 'transaction',
//   collection: 'carts'
// });

// // Catch errors
// store.on('error', function(error) {
//   console.log(error);
// });

// app.use(require('express-session')({
//   secret: 'miniProject',
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7 //1 week 
//   },
//   resave: true,
//   store: store,
//   saveUninitialized: true
// }));
/* end */

/*HTTPS connection*/
/*STEPS*/
/*1. Generate a private key
      openssl genrsa -out key.pem
  2. Create CSR using private key
      openssl req -new -key key.pem -out csr.epm
      (rename extension file csr.epm become csr.pem)
  3.  Generate SSL certification from CSR
      openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem */  
// const sslServer = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
// }, app)

/*end connection*/  

/*Connect to views */ 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/views'));

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

/*ROUTES*/ 
const routes = require('./routes/routes');
routes(app);

/*Check secure token*/ 

router.get('/secure', (req, res) => {
  res.send('Secure');
});

/*TOKEN CHECKER*/ 
const token = require('./middleware/tokenChecker');

/*connect to models*/
dbAccount = require('./models/account/index');
dbProduct = require('./models/product/index');
dbTransaction = require('./models/transaction/index');
dbAuth = require('./models/auth/index');
dbSupplier = require('./models/product/index');
dbOrderProduct = require('./models/product/index');

//sync to sequilize
dbAccount.sequelize.sync();
dbProduct.sequelize.sync();
dbTransaction.sequelize.sync();
dbAuth.sequelize.sync();
dbSupplier.sequelize.sync();
dbOrderProduct.sequelize.sync();

/*PORT*/
const PORT = process.env.PORT || 8001;
// sslServer.listen(PORT, () => {
  app.listen(PORT, () => {
    console.log(`--->Balance Service on PORT ${PORT}.<---`);
  });

/*MONGODB*/
const mongoose = require('mongoose');
const PORT_TRANSACTION = process.env.PORT_TRANSACTION || 27017

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
mongoose.connection.once('open', function(){
  console.log(`--->Merchant Service on PORT ${PORT_TRANSACTION}<---`);
}).on('error', function(error){
  console.log('error is:', error);
});

/*ELASTICSEARCH*/
const { Client } = require('elasticsearch')
const esClient = new Client({
  node: ['http://localhost:9200'],
  log: 'trace',
});
esClient.info(console.log);
esClient.ping({
  requestTimeout: 30000,
});