'use strict';
const orderProduct = require('../../models/product/mongo/orderProduct');

exports.order = async () => {
    const orders = await orderProduct.find().populate({
        path: "supplier",
        select: "name"
    });;
    return orders;
};
exports.addOrder = async add => {
    const newOrder = await orderProduct.create(add);
    return newOrder;
};
exports.orderByDate = async () => {
    const order = await orderProduct.find(date_order).populate({
        path: "supplier",
        select: "name"
    });;
    return order;
}