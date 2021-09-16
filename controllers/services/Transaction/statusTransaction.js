'use strict';
const statusTransaction = require("../../../models/transaction/index");
const status = statusTransaction.statusTransaction;

/*POST*/
exports.addStatus = (req, res) => {
    status: req.body.method

    status.create(req.body)
    .then(data => {
        res.status(200).json({
            message: 'Added',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

/*GET*/
exports.getStatus = (req, res) => {
    status.findAll({
        attributes: ['id', 'status']
    }).then((data) => {
        res.status(200).send({
            data: data,
            message: 'status payment'
        });
    })
} 