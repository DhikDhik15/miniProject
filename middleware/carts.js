'use strict';
const Cart = require('../models/transaction/mongo/cart');

exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total"
    });;
    return carts[0];
};

exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
};

exports.removeItem = async id => {
    const cartsItem = await Cart.findByIdAndRemove(id);
    return cartsItem
}
