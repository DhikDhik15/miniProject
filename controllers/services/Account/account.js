'use strict';
const dbAccount = require ('../../../models/account/index');
const tableAccount = dbAccount.account;
const tableDistrict = dbAccount.district;
const tableProvince = dbAccount.province;


//POST
exports.addAccount = (req, res) => {
    const post = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        image: req.file.filename,
        id_province: req.body.id_province,
        id_district: req.body.id_district
    }

    if (!post.username || !post.email || !post.phone || !post.address || !post.id_province || !post.id_district || !post.image == undefined){
        res.status(422).json({
            message: 'Form cannot be null'
        })
        return;
    } else {
        tableAccount.create(post)
        .then(data => {
            res.status(200).json({
                message: 'Berhasil menyimpan',
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:err.message
            });
        })
    }
},

//GET
exports.getAccount = (req, res) => {
    tableProvince.hasMany(tableAccount, {foreignKey: 'id_province'});
    tableAccount.belongsTo(tableProvince, { foreignKey: 'id' });

    tableAccount.hasOne(tableDistrict, { foreignKey: 'id_district' });
    tableDistrict.belongsTo(tableAccount, { foreignKey: 'id' });

    tableProvince.hasMany(tableDistrict, { foreignKey: 'id_province' }),
    tableDistrict.belongsTo(tableProvince, { foreignKey: 'id' });

    tableProvince.findAll({
        attributes: ['id', 'name'],
        include: [
            {
            model: tableAccount,
            attributes: ['id', 'username', 'email', 'phone', 'address', 'image', 'id_province', 'id_district'],        
        },
        {
            model: tableDistrict,
            attributes: ['id', 'id_province', 'name']
        }]
    }).then ((data) => {
        res.status(200).send({
            data:data,
            message: "Data User"
        });
    });

},

// PUT
exports.putAccount = (req, res) => {
    const data = {
        id: req.body.id,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        image: req.file.filename,
        id_province: req.body.id_province,
        id_district: req.body.id_district
    }
    tableAccount.update(req.body, {
        where: { id: data.id }
    }).then(num => {
        if (num == 1){
            res.send({
                message: "Update berhasil"
        });
        } else {
            res.send({
                message: `Gagal update id=${id}`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: "Error update"
        });
    });
},

//DELETE
exports.deleteAccount = (req, res) => {
    const id= req.body.id;
  
    tableAccount.destroy({
      where: {id: id}
    }).then (num => {
      if (num == 1){
        res.send({
          message: "Account was deleted"
        });
      } else {
        res.send({
          message: `Error delete id=${id}`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Tidak dapat menghapus"
      });
    });
  }
  