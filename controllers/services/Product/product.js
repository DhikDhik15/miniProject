var dbProduct = require ('../../../models/product/index');
var tableProduct = dbProduct.product;


/* POST */
// exports.addProduct = (req,res) => {

//     const storage = multer.diskStorage({
//         destination: path.join('uploads'),
          
//         filename: function (req, file, cb) {
//             cb(null, file.fieldname + '-' + Date.now() +
//             path.extname(file.originalname));
//         }
//     });
    
//     const upload = multer({storage: storage}).single('image');

//     const add = {
//         name: req.body.name,
//         image: req.file.path
//     }  
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
exports.addProduct = async function (req, res){
    try {
        if (!req.body.name || req.body.images == undefined){
            res.status(400).json({
                message: 'Empty'
            });
            return;
        }
        const add = {
            name: req.body.name,
            images: req.body.filename
        };
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
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error'
        });
        
    }
}