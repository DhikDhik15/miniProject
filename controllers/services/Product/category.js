'use strict';
const dbProduct = require('../../../models/product/index');
const tableCategory = dbProduct.category;

/* POST */ 
exports.addCategory = (req, res) => {
    const category = {
        name: req.body.name
    }

    tableCategory.create(category)
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
exports.getCategory = (req, res) => {
    tableCategory.findAndCountAll({
        attributes: ['id', 'name'],
        order: [['id', 'ASC']]
    }).then((data) => {
        res.status(200).send({
            data: data,
            message: 'list category'
        });
    })
}

/*PUT*/
exports.putCategory = async function (req, res){
    try {
        const put = {
            id: req.body.id,
            name: req.body.name,
        }
        tableCategory.update({
            name: put.name
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

/*DELETE*/
exports.deleteCategory = function (req, res){
    const id = req.body.id;

    tableCategory.destroy({
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
