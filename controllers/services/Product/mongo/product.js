'use strict';

const product = require('../../../../middleware/mongo/product');
const elasticsearch = require('elasticsearch');
const Product = require('../../../../models/product/mongo/product');
const Client = elasticsearch.Client({
    host: "http://127.0.0.1:9200",
})

exports.createProduct = async (req, res) => {
    console.log(req.file);
    // Client.index({
    //     index: 'product',
    // })    
    // const payload = {
    //     body: {
    //         "name": req.body.name,
    //         "category": req.body.category,
    //         "supplier": req.body.supplier,
    //         "price": req.body.price,
    //         "stock": req.body.stock,
    //         "barcode": req.body.barcode,
    //         "image": req.file.filename
    //         }
    // }
    // const Product = await product.createProduct({ ...payload });
    // res.status(200).json({
    //     status: true,
    //     message: 'indexing successfully',
    //     data: Product,
    //         })    
    // .catch(err => {
    //     return res.status(500).json({"message": "Error"})
    // })
    try {
        Client.index({
            index: 'product',
            
        })
        const payload = {
            name: req.body.name,
            category: req.body.category,
            supplier: req.body.supplier,
            price: req.body.price,
            stock: req.body.stock,
            barcode: req.body.barcode,
            image: req.file.filename
        }
        const Product = await product.createProduct({
            ...payload
        });
        res.status(200).json({
            status: true,
            data: Product,
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
        const Products = await product.products();
        res.status(200).json({
            status: true,
            data: Products,
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
        const productDetails = await product.productById(id);
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
        const productDetails = await product.removeProduct(id)
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

exports.searchProduct = (req, res) => {
    try {
        const query = {
            index: 'product'
        }
        if (req.query.product) query =  `*${req.body.query}*`;
        Client.search(query)
        .then(response => {
            return res.json(200).json({
                message: 'Product',
                data: response.hits.hits
            })
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Product not found',
            error
        });
    }
}
