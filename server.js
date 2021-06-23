const express = require("express");
const bodyParser = require("body-parser");
const session = require ('express-session');
const router = express.Router();
/*HTTPS*/ 
const https = require ('https');
const path = require ('path');
const fs = require ('fs');
/*REDIS*/ 
const redis = require ('redis');
const redisStore = require ('connect-redis')(session);
const client = redis.createClient();
/*.ENV*/ 
const dotenv = require('dotenv');
/*CORS*/ 
const cors = require ("cors");
const Sequelize = require("sequelize");
/*SWAGGER*/ 
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const apiDocumentation = require('./miniProject.json');



/*connect to models*/
dbAccount = require('./models/account/index');
dbProduct = require('./models/product/index');
dbTransaction = require('./models/transaction/index');
dbPayment = require('./models/payment/index');
dbAuth = require('./models/auth/index');

const app = express();
var corsOption = {
  origin: "http://localhost:8001"
};

/* Redis session connect */
app.use(session({
  secret: 'mini-project',
  store: new redisStore({
    host: 'localhost', port: 6379, client: client,ttl: 260
  }),
  saveUninitialized: false,
  resave: false
})); 
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
const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app)

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

//sync to sequilize
dbAccount.sequelize.sync();
dbProduct.sequelize.sync();
dbTransaction.sequelize.sync();
dbPayment.sequelize.sync();
dbAuth.sequelize.sync();


/*config PORT*/
const PORT = process.env.PORT || 8001;
sslServer.listen(PORT, () => {
  console.log(`Secure connection on PORT ${PORT}.`);
});
