'use strict';
const dbAccount = require ('../../../models/account/index');
const tableAccount = dbAccount.account;
const tableDistrict = dbAccount.district;
const tableProvince = dbAccount.province;
const validator = require('email-validator').validate;
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*Registration*/ 
exports.addAccount = async (req, res) => {
    //Encrypt user password
    const post = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        phone: req.body.phone,
        address: req.body.address,
        image: req.file.filename,
        id_province: req.body.id_province,
        id_district: req.body.id_district
    }

    if (!post.username || !post.email || !post.phone ||
        !post.address || !post.id_province || 
        !post.id_district || !post.image == undefined || !post.password ||
        !validator(post.email)){
        res.status(422).json({
            message: 'Please check your input'
        })
        return;
    } else {
        await tableAccount.findOne({
            where: { email: post.email }
        }).then (account => {
            if(account){
                return res.status(422).json({
                    message: 'Email already exist'
                });
            }
        })

        const user = await tableAccount.create(post);

        const token = jwt.sign({
            userId: user.id, post
        }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        
        user.token = token;
        res.status(201).json({
            message: 'Registration successfully',
            user,
        });
}
}

/*LOGIN*/ 
exports.loginAccount = async (req, res) => {
    const login = {
        email: req.body.email,
        password: req.body.password
    }
    if(!login.email || !login.password){
        res.status(400).json({
            message: 'Input valid email & password'
        })
    }
    const user = await tableAccount.findOne({ 
        where: { email: login.email }
    });
    if(user && (await bcrypt.compare(login.password, user.password))){

        /*Create token*/
        const token = jwt.sign({
            userId: user.id, login
        }, process.env.TOKEN_KEY, {
            algorithm: "HS256",
            expiresIn: process.env.REFRESH_TOKEN_LIFE
        });

        /*Create refresh token*/
        const refreshToken = jwt.sign({
            userId: user.id, login
        }, process.env.REFRESH_TOKEN,{
            algorithm: "HS256",
            expiresIn: process.env.REFRESH_TOKEN_LIFE
        })
        
        /*Save refersh token*/
        user.refreshToken = refreshToken;
        
        /*Save Token*/
        user.token = token;
        res.status(201).json({
            message: 'Login successfully',
            user,
        });
        res.cookie("jwt", token, {secure: true, httpOnly: true})
        res.send()
    }
        res.status(401).json({
            message: 'Forbidden login !!!'
        });

}

/*GET ACCOUNT*/
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
}



