'use strict';
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'../uploads/buyer'));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg') {
            return callback(new Error('Only Images allowed'))
        }
        callback(null, true)
    },
    limits: { files: 1 },
  }).single('image');
