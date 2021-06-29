var dbAccount = require ('../../../models/account/index');
var tableDistrict = dbAccount.district;
var tableProvince = dbAccount.province;
const sequelize = require ('sequelize');

// POST
exports.addDistrict = (req,res) => {
      
        const district = {
            name: req.body.name,
            id_province: req.body.id_province
        }  

     if (!district.name || !district.id_province){
        res.status(422).json({
            message: 'Name cannot be null'
        })
        return;
    } else {
        tableDistrict.create(district)
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
},

// GET
exports.getDistrict = (req, res) => {
    const id=  req.params.id;
    // Join Table District --> Province
    // Province (Parent) -- District (child)
    tableProvince.hasMany(tableDistrict, { foreignKey: 'id' }),
    tableDistrict.belongsTo(tableProvince, { foreignKey: 'id_province' });

    tableDistrict.findAll({
        attributes: ['id', 'name', 'id_province'],
        where: {
            id: id
        },
        include: [{
            model: tableProvince,
            attributes: ['id', 'name']
        }]
    }).then((data) => {
        res.status(200).json({
            message: 'Data kab kota',
            data:data
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

// PUT

// DELETE

