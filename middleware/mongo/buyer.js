'use strict';
const Buyer = require('../../models/transaction/mongo/buyer');

exports.getTransaction = async () => {
    const buy = await Buyer.find()
    .populate({
        path: "cart",
        select: "subTotal"
    });;
    return buy;
}
exports.createTransactionBuy = async addTransactionBuy => {
    const newTransaction = await Buyer.create(addTransactionBuy);
    return newTransaction;
}
exports.deleteTransactionBuy = async _id => {
    const remove = await Buyer.findByIdAndRemove(_id);
    return remove;
}