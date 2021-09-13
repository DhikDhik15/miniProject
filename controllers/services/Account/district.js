const dbAccount = require ('../../../models/account/index');
const tableDistrict = dbAccount.district;
const tableProvince = dbAccount.province;

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

// GET DISTRICT BY ID
exports.getDistrictByID = (req, res) => {
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
    }).then((district) => {
        res.status(200).json({
            message: 'District',
            data:district
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

/*GET ALL DISTRICT*/ 
exports.getDistrict = (req, res) => {
    tableProvince.hasMany(tableDistrict, { foreignKey: 'id_province' }),
    tableDistrict.belongsTo(tableProvince, { foreignKey: 'id' });

    tableProvince.findAll({
        attributes: ['id', 'name'],
        order: [['id', 'ASC']],
        include: [{
            model: tableDistrict,
            attributes: ['id', 'id_province', 'name']
        }]
    })
    .then((district) => {
        res.status(200).json({
            message: ' District ',
            data:district
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}
/*PUT DISTRICT*/
exports.putDistrict = (req, res) => {
    const put = {
        id: req.body.id,
        id_province: req.body.id_province,
        name: req.body.name
    }
    tableDistrict.update(req.body, {
        where: { id: put.id }
    }).then(district => {
        if (district == 1){
            res.send({
                message: 'Updated' 
            });
        } else {
            res.send({
                message: 'Failed'
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: 'Error update'
        });
    });
}




