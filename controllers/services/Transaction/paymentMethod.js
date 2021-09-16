'use strict';
const paymentMethod = require("../../../models/transaction/index");
const method = paymentMethod.paymentMethod;

/*POST*/
exports.addMethod = (req, res) => {
    method: req.body.method

    method.create(req.body)
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
exports.getMethod = (req, res) => {
    method.findAll({
        attributes: ['id', 'method']
    }).then((data) => {
        res.status(200).send({
            data: data,
            message: 'payment method'
        });
    })
} 