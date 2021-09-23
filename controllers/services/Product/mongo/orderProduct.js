'use strict'
const Order = require('../../../../middleware/mongo/orderProduct');

exports.createOrder = async (req, res) => {
    console.log(req.file);
    try {
        const add = {
            name_product: req.body.name_product,
            supplier: req.body.supplier,
            quantity: req.body.quantity,
            date_order: req.body.date_order,
            description: req.body.description,
            image: req.file.filename
        }
        const order = await Order.addOrder({
            ...add
        });
        res.status(200).json({
            status: true,
            data: order,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.order();
        res.status(200).json({
            status: true,
            data: order,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}