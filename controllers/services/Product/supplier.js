'use strict';
const dbSupplier = require('../../../models/product/index');
const dbCategory = require('../../../models/product/index');
const tableSupplier = dbSupplier.supplier;
const tableCategory = dbCategory.category;

/* POST */ 
exports.addSupplier = (req, res) => {
    const add = {
        supplier_name: req.body.supplier_name,
        address: req.body.address,
        phone: req.body.phone,
        brand: req.body.brand,
        id_category: req.body.id_category,
        description: req.body.description
    }

    tableSupplier.create(add)
    .then(data => {
        res.status(200).json({
            message: 'Berhasil',
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

/*GET*/
exports.getSupplier = (req, res) => {

    tableCategory.hasMany(tableSupplier, { foreignKey: 'id_category' });
    tableSupplier.belongsTo(tableCategory, { foreignKey: 'id' });

    tableCategory.findAll({
        attributes: ['id', 'name'],
        include:[{
            model: tableSupplier,
            attributes: ['id', 'id_category', 'supplier_name', 'address', 'phone', 'brand', 'description'],
            order: [['id', 'ASC']]
        }]
    }).then((data) => {
        res.status(200).send({
            data: data,
            message: 'list supplier'
        });
    })
}

/*PUT*/
exports.putSupplier = async function (req, res){
    try {
        const put = {
            id: req.body.id,
            supplier_name: req.body.supplier_name,
            address: req.body.address,
            phone: req.body.phone,
            brand: req.body.brand,
            id_category: req.body.id_category,
            description: req.body.description
        }
        tableSupplier.update({
            supplier_name: put.supplier_name,
            address: put.address,
            phone: put.phone,
            brand: put.brand,
            id_category: put.id_category,
            description: put.description
        },{
            where: {
                id: put.id
            }
        }).then((data) => {
            if (data == 1){
                res.status(200).json({
                    message: 'updated'
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error'
        });
    }
}
