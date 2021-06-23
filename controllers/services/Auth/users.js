var dbAuth = require ('../../../models/auth/index');
var tableAuth = dbAuth.auth;
const sequelize = require ('sequelize');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const configToken = require('../../../config.json');
const tokenList = {}

//POST
exports.addUsers = (req, res) => {
    const users = {
        email: req.session.email = req.body.email,
        password: req.body.password
    }

    const token = jwt.sign(users, configToken.secret, { expiresIn: configToken.tokenLife })
    const refreshToken = jwt.sign(users, configToken.refreshTokenSecret, { expiresIn: configToken.refreshTokenLife })
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }
    tokenList[refreshToken] = response
    res.status(200).json(response);

    if (!req.body.email || !req.body.password){
        res.status(422).json({
            message: 'Form cannot be empty'
        })
        return;
    } else {
        tableAuth.create(users)
        .then(data => {
            res.status(200).json({
                message: 'Done',
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
    }
},

// TOKEN
exports.tokenUsers = (req, res) => {
    /*Refresh Token*/ 
    const postUsers = req.body

    /*If Token exist*/
    if((postUsers.refreshToken) && (postUsers.refreshToken in tokenList)) {
        const user = {
            "email": postUsers.email
        }
        const token = jwt.sign(user, configToken.secret, {
            expiresIn: configToken.tokenLife
        })
        const response = {
            "token": token
        }
        /*update token*/
        tokenList[postUsers.refreshToken].token = token 
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid Request')
    }
},

//GET USER
exports.getUser = (req, res) => {
    let sess = req.session;
    if (sess.email) {
        return res.redirect('/admin');
    }
    res.sendFile('index.html');
},

//GET ADMIN
exports.getAdmin = (req, res) => {
    if(req.session.email) {
        res.write(`<h1>Hello ${req.session.email} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Login dahulu bos !!</h1>');
        res.end('<a href='+'/'+'>Login</a>');
    }
},

//LOGOUT
exports.logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
}