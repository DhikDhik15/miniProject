'use strict';

const product = require('../../../../middleware/mongo/product');
const elasticsearch = require('elasticsearch');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config;
const catchError = require('../../../../middleware/catchAsyncError');
const Client = elasticsearch.Client({
    host: "http://127.0.0.1:9200",
})
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

exports.createProduct = catchError (async (req, res) => {
    console.log(req.file);
    const path = req.file.path
    const uniqueFilename = new Date().toISOString()
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
        if(payload){
            cloudinary.uploader.upload(path,{
                public_id: `product/${uniqueFilename}`, tags: `product`
            },
            function(err, image){
                if(err) return res.send(err)
                console.log('upload to cloud')
                const fs = require('fs')
                fs.unlinkSync(path)
                res.json(image)
            })
        }
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
})

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

exports.getProductById = async (req, res, next) => {
        const productDetails = await product.productById(req.params.id);
        if (!productDetails) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            })
          }
          res.status(200).json({
            data: productDetails,
        })
        }

exports.removeProduct = async (req, res) => {
        const productDetails = await product.removeProduct(req.params.id);
        if (!productDetails) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            })
          }
        res.status(200).json({
            status: true,
            message: 'Data was deleted'
        })
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
