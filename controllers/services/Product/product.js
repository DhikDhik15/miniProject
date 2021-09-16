'use strict';
const dbProduct = require ('../../../models/product/index');
const dbSupplier = require ('../../../models/product/index');
const tableProduct = dbProduct.product;
const tableCategory = dbProduct.category;
const tableSupplier = dbSupplier.supplier;

/* POST */
exports.addProduct = async function (req, res){
    console.log(req.file);
    try {
        const add = {
            name: req.body.name,
            id_category: req.body.id_category,
            id_supplier: req.body.id_supplier,
            stock: req.body.stock,
            image: req.file.filename,
            price: req.body.price,
            description: req.body.description,
            expired: req.body.expired,
            barcode: req.body.barcode
        }
        if (!req.body.name || !req.file.filename == undefined || !req.body.id_category
            || !req.body.stock || !req.body.description || 
            !req.body.price || !req.body.barcode || !req.body.expired || !req.body.id_supplier){

            res.status(400).json({
                message: 'Kolom kosong'
            });
            return;
        } else {
            tableProduct.findAll({
              attributes:['name'],
              where: {
                name: add.name
              }
            })
            .then(data => {
            if (data.length >= 1) {
                res.status(422).json({
                    message: 'Product sejenis sudah ada'
                });
            } else {
                tableProduct.create(add)
                .then(data => {
                    res.status(200).json({
                        message:'success',
                        data: data
                    });
                })
            }
        })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error'
        });
    }
}

/*GET*/
exports.getProduct = (req, res) => {
    tableCategory.hasMany(tableProduct, { foreignKey: 'id_category' });
    tableProduct.belongsTo(tableCategory, { foreignKey: 'id' });
    
    tableSupplier.hasMany(tableProduct, { foreignKey: 'id_supplier' });
    tableProduct.belongsTo(tableSupplier, { foreignKey: 'id' });

    tableCategory.hasMany(tableSupplier, { foreignKey: 'id_category' });
    tableSupplier.belongsTo(tableCategory, { foreignKey: 'id' });

    tableCategory.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: tableSupplier,
            attributes: ['id', 'supplier_name', 'brand', 'id_category'],
            order: [['id', 'ASC' ]]
        },
        {
            model: tableProduct,
            attributes: ['id', 'name', 'id_category', 'id_supplier', 'image','price', 'stock', 'description', 'expired', 'barcode'],
            order: [['id', 'ASC']]
            
        }
    ]
    })
    .then((data) => {
        res.status(200).send({
            data: data,
            message: 'List Product'
        });
    })
}

/*PUT*/
exports.putProduct = async function (req, res){
    try {
        const put = {
            id: req.body.id,
            name: req.body.name,
            id_category: req.body.id_category,
            id_supplier: req.body.id_supplier,
            stock: req.body.stock,
            image: req.file.filename,
            price: req.body.price,
            description: req.body.description,
            expired: req.body.expired,
            barcode: req.body.barcode
        }
        if (!req.body.name || !req.file.filename == undefined || !req.body.id_category
            || !req.body.stock || !req.body.description || !req.body.price ||
            !req.body.barcode || !req.body.id_supplier){
            res.status(400).json({
                message: 'Kolom kosong'
            });
            return;
        } else {
            tableProduct.update({
                name: put.name,
                id_category: put.id_category,
                id_supplier: put.id_supplier,
                stock: put.stock,
                image: put.image,
                price: put.price,
                description: put.description,
                expired: put.expired
            },{
                where:{
                    id: put.id
                }
            })
            .then((data) => {
                if (data == 1){
                    res.status(200).json({
                        message: 'updated'
                    });
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error'
        });
    }
}

/*DELETE*/
exports.deleteProduct = function (req, res){
    const id = req.body.id;

    tableProduct.destroy({
        where: {id: id}
    })
    .then(data => {
        if(data >=1){
            res.status(200).json({
                message: 'Deleted'
            });
        } else {
            res.status(404).json({
                message: 'Nothing to delete'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: error
        });
    })
}

/*GET REPORT OF STOCK*/
exports.getReportStock = (req, res) => {
    tableCategory.hasMany(tableProduct, { foreignKey: 'id_category' });
    tableProduct.belongsTo(tableCategory, { foreignKey: 'id' });

    tableCategory.findAndCountAll({
        attributes: ['id', 'name'],
        include: [{
          model: tableProduct,
          attributes: ['id', 'name', 'image', 'stock'],
          order: [['id', 'ASC']]
        }]
    })
    .then((data) => {
        res.status(200).send({
            data: data,
            message: 'Report Stock of Product'
        });
    })
}
