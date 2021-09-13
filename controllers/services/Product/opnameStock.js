const dbProduct = require('../../../models/product/index');
const tableProduct = dbProduct.product;
const tableOpname = dbProduct.opname;

/*POST*/
exports.addOpname = (req, res) => {
    const opname = {
        id_product: req.body.id_product,
        count_product_out: req.body.count_product_out,
        left_product: req.body.left_product,
        req_product: req.body.req_product,
        in_product: req.body.in_product,
        description: req.body.description
    }
    tableOpname.create(opname)
    .then(opname => {
        res.status(200).json({
            message: 'Berhasil',
            data: opname
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}
/*GET*/
exports.getOpname = (req, res) => {
    tableOpname.hasMany(tableProduct, { foreignKey: 'id' });
    tableProduct.belongsTo(tableOpname, { foreignKey: 'id_product' });

    tableOpname.findAll({
        attributes:['id', 'id_product', 'count_product_out', 'left_product', 'req_product', 'in_product', 'description'],
        order: [['id', 'ASC']],
        include: [{
            model: tableProduct,
            attributes: ['id', 'name'],
        }]
    }).then((opname) => {
        res.status(200).send({
            data: opname,
            message: 'Barang Opname'
        });
    })
} 