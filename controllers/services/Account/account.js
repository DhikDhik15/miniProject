var dbAccount = require ('../../../models/account/index');
var tableAccount = dbAccount.account;
const sequelize = require ('sequelize');

//POST
exports.addAccount = (req, res) => {
    const post = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        id_province: req.body.id_province,
        id_district: req.body.id_district
    }

    if (!post.username || !post.email || !post.phone || !post.address || !post.id_province || !post.id_district){
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
    tableAccount.findAll({
        attributes: ['id', 'username', 'email', 'phone', 'address', 'id_province', 'id_district'],
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
  