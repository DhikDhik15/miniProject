var dbAccount = require('../../../models/account/index');
var tableProvince = dbAccount.province;
const sequelize = require('sequelize');

// POST
exports.addProvince = (req, res) => {
  const post = {
    name: req.body.name
  }

  if (!post.name){
    res.status(422).json({
      message: 'Name empty'
    })
    return;
  } else {
    tableProvince.findAll({
      attributes:['id', 'name'],
      where: {
        name:post.name
      }
    }).then((dataProvince) => {
      if (dataProvince.length >= 1){
        res.status(422).json({
          message: 'Provinsi sudah ada',
        })

        /*POST DATA*/
      } else {
        tableProvince.create(post)
        .then((data) => {
          res.status(200).json({
            message: 'Berhasil',
            data:data
          });
        }).catch((err) => {
          res.status(500).send({
            message:err.message
          });
        })
      }

    }).catch((err) => {
      res.status(500).json({
        message: err
      });
    })
  }
},

// GET
exports.getProvince = (req, res) => {
  tableProvince.findAll({
    attributes: ['id', 'name'],
  }).then ((data) => {
    res.status(200).send({
      data:data,
      message: "Data province"
    });
  });
}
