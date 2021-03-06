'use strict';
const Product = require ('../../models/product/mongo/product');

exports.products = async () => {
    const products = await Product.find().populate({
        path: "category supplier", //JOIN IN 2 SCHEMA
        select: "name name"
    });;
    return products;
};
exports.productById = async id => {
    const product = await Product.findById(id).populate({
        path: "category supplier",
        select: "name name"
    });;
    return product;
}
exports.createProduct = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct
}
exports.removeProduct = async id => {
    const product = await Product.findByIdAndRemove(id);
    return product
}