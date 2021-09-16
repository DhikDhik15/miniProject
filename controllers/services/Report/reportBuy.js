'use strict';
const buyProduct = require('../../../models/product/index');
// const product = buyProduct.product;
const supplier = buyProduct.supplier;
const order = buyProduct.order_product;

/*GET*/
exports.getReportBuy = (req, res) => {
    supplier.hasOne(order, { foreignKey: 'id' });
    order.belongsTo(supplier, { foreignKey: 'id_supplier' });

    order.findAll({
        attributes: ['id', 'id_supplier', 'name_product', 'qty', 'date_order','image'],
        include:[{
            model: supplier,
            attributes: ['id', 'supplier_name']
        }]
    }).then((data) => {
        res.status(200).send({
            data: data,
            message: 'Report Buy Product'
        });
    })
} 

/*GET BY DATE*/
exports.getReporyByDate = (req, res) => {
    const date_order= req.body.date_order

    supplier.hasOne(order, { foreignKey: 'id' });
    order.belongsTo(supplier, { foreignKey: 'id_supplier' });

    order.findAll({
        attributes: ['id', 'id_supplier', 'name_product', 'qty', 'date_order'],
        where: { date_order: date_order },
        include:[{
            model: supplier,
            attributes: ['id', 'supplier_name'],
        }]
    }).then((data) => {
        res.status(200).send({
            data: data,
            message: 'Report Buy Product'
        });
    })
} 