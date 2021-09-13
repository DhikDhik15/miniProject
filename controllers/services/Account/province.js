const dbAccount = require('../../../models/account/index');
const tableProvince = dbAccount.province;

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

//PUT
exports.putProvince = (req, res) => {
  const data = {
    id: req.body.id,
    name: req.body.name
  }
  tableProvince.update(req.body, {
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
exports.deleteProvince = (req, res) => {
  const id= req.body.id;

  tableProvince.destroy({
    where: {id: id}
  }).then (num => {
    if (num == 1){
      res.send({
        message: "Province was deleted"
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
