'use strict';

const transaction = require('../../../models/transaction/index');
const tableTransaction = transaction.transaction;

/*POST*/
exports.addTransaction = async function (req, res){
    try {
        const add = {
            id_user: req.body.id_user,
            id_product: req.body.id_product,
            date: req.body.date,
            status: req.body.status
        }
        if (!add.id_user || !add.id_product || !add.date || !add.status){
            res.status(400).json({
                message: 'Kolom kosong'
            });
            return;
        } else {
            tableTransaction.create(add)
            .then(data => {
                res.status(200).json({
                    message: 'success',
                    data: data
                });
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error'
        });
    }
} 