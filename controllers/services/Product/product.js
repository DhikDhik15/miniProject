var dbProduct = require ('../../../models/product/index');
var tableProduct = dbProduct.product;


/* POST */
exports.addProduct = async function (req, res){
    console.log(req.file);
    try {
        const add = {
            name: req.body.name,
            image: req.file.filename
        }
        if (!req.body.name || req.file.filename == undefined){
            res.status(400).json({
                message: 'Form Empty'
            });
            return;
        } else {
            await tableProduct.findAll()
        .then(data => {
            if (data.length >= 3) {
                res.status(422).json({
                    message: 'Product sudah ada'
                });
            } else {
                tableProduct.create(add)
                .then(data => {
                    res.status(200).json({
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