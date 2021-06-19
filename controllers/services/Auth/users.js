var dbAuth = require ('../../../models/auth/index');
var tableAuth = dbAuth.auth;
const sequelize = require ('sequelize');

//POST
exports.addUsers = (req, res) => {
    // req.session.email = req.body.email;
    // res.end('done');
    const form = {
        email: req.session.email = req.body.email,
        password: req.body.password
    }
    

    if (!req.body.email || !req.body.password){
        res.status(422).json({
            message: 'Form cannot be empty'
        })
        return;
    } else {
        tableAuth.create(form)
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