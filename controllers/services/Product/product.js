var dbProduct = require ('../../../models/product/index');
var tableProduct = dbProduct.product;
const sequelize = require('sequelize');


/* POST */
exports.addProduct = (req,res) => {
    console.log(req.file);
      
//     const add = {
//         name: req.body.name,
//         id_category: req.body.id_category,
//         price: req.body.price,
//         images: req.file.path,
//         stock: req.body.stock
//     }  

//  if (!add.name || !add.id_category || !add.price || !add.images || !add.stock){
//     res.status(422).json({
//         message: 'Form cannot be null'
//     })
//     return;
// } else {
//     tableProduct.create(add)
//     .then(data => {
//         res.status(200).json({
//             message: 'Berhasil',
//             data: data
//         });
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message
//         });
//     });
// }
}