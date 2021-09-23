'use strict';
const Supplier = require('../../models/product/mongo/supplier');

exports.getSupplier = async () => {
    const supplier = await Supplier.find();
    return supplier;
}
exports.addSupplier = async add => {
    const newSupplier = await Supplier.create(add);
    return newSupplier
}
