var dbAccount = require ('../../../models/account/index');
var tableAccount = dbAccount.account;
const sequelize = require ('sequelize');

//POST
exports.addAccount = (req, res) => {
    const post = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        id_province: req.body.id_province,
        id_district: req.body.id_district
    }

    if (!post.username || !post.email || !post.phone || !post.address || !post.id_province || !post.id_district){
        res.status(422).json({
            message: 'Form cannot be null'
        })
        return;
    } else {
        tableAccount.create(post)
        .then(data => {
            res.status(200).json({
                message: 'Berhasil menyimpan',
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:err.message
            });
        })
    }
},

//GET
exports.getAccount = (req, res) => {
    tableAccount.findAll({
        attributes: ['id', 'username', 'email', 'phone', 'address', 'id_province', 'id_district'],
    }).then ((data) => {
        res.status(200).send({
            data:data,
            message: "Data User"
        });
    });

}