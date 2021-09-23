'use strict';

const Supplier = require('../../../../middleware/mongo/supplier');

exports.addSupplier = async (req, res) => {
    try {
        const add = {
            name: req.body.name,
        }
        const data = await Supplier.addSupplier({
            ...add
        });
        res.status(200).json({
            status: true,
            data: data,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getSupplier = async (req, res) => {
    try {
        const data = await Supplier.getSupplier();
        res.status(200).json({
            status: true,
            data: data,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}