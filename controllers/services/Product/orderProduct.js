'use strict';
const dbProduct = require('../../../models/product/index');
const tableOrderProduct = dbProduct.order_product;
const tableSupplier = dbProduct.supplier;

/*POST*/
exports.addOrderProduct = (req, res) => {
    const add = {
        name_product: req.body.name_product,
        id_supplier: req.body.id_supplier,
        qty: req.body.qty,
        image: req.file.filename,
        date_order: req.body.date_order,
        description: req.body.description
    }
    tableOrderProduct.create(add)
    .then(order => {
        res.status(200).json({
            message: 'Berhasil',
            data: order
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
} 

/*GET*/
exports.getOrderProduct = (req, res) => {
    tableSupplier.hasOne(tableOrderProduct, { foreignKey: 'id' });
    tableOrderProduct.belongsTo(tableSupplier, { foreignKey: 'id_supplier' });

    tableOrderProduct.findAll({
        attributes: ['id', 'id_supplier', 'name_product', 'qty', 'image', 'date_order', 'description'],
        include:[{
            model: tableSupplier,
            attributes: ['id', 'supplier_name', 'brand']
        }]
    }).then((data) => {
        res.status(200).send({
            data: data,
            message: 'Report Buy Product'
        });
    })
} 

/*GET BY DATE*/
exports.getOrderProductbyDate = (req, res) => {
    const date_order= req.body.date_order

    tableSupplier.hasOne(tableOrderProduct, { foreignKey: 'id' });
    tableOrderProduct.belongsTo(tableSupplier, { foreignKey: 'id_supplier' });

    tableOrderProduct.findAll({
        attributes: ['id', 'id_supplier', 'name_product', 'qty', 'image', 'date_order', 'description'],
        where: { date_order: date_order },
        include:[{
            model: tableSupplier,
            attributes: ['id', 'supplier_name', 'brand'],
        }]
    }).then((data) => {
        res.status(200).send({
            data: data,
            message: 'Report Buy Product'
        });
    })
} 

/*PUT*/ 
exports.putOrderProduct = (req, res) => {
    const put = {
        id: req.body.id,
        id_supplier: req.body.id_supplier,
        name_product: req.body.name_product,
        qty: req.body.qty,
        image: req.file.filename,
        date_order: req.body.date_order,
        description: req.body.description
    }
    tableOrderProduct.update({
        id_supplier: put.id_supplier,
        name_product: put.name_product,
        qty: put.qty,
        image: put.image,
        date_order: put.date_order,
        description: put.description
    },{
        where: { id: put.id }
    }).then((data) => {
        if (data == 1){
            res.status(200).json({
                message: 'updated'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:err.message
        });
    })
}