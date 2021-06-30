var dbProduct = require('../../../models/product/index');
tableCategory = dbProduct.category;

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
