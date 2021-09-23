'use strict';

const Product = require('../../../../middleware/mongo/product');

exports.createProduct = async (req, res) => {
    console.log(req.file);
    try {
        const payload = {
            name: req.body.name,
            category: req.body.category,
            supplier: req.body.supplier,
            price: req.body.price,
            stock: req.body.stock,
            barcode: req.body.barcode,
            image: req.file.filename
        }
        const product = await Product.createProduct({
            ...payload
        });
        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const productDetails = await Product.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeProduct = async (req, res) => {
    try {
        const id = req.params.id
        const productDetails = await Product.removeProduct(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
