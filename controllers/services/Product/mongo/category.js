'use strict';

const Category = require('../../../../middleware/mongo/category');

exports.createCategory = async (req, res) => {
    try {
        const add = {
            name: req.body.name,
        }
        const category = await Category.createCategory({
            ...add
        });
        res.status(200).json({
            status: true,
            data: category,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getCategory = async (req, res) => {
    try {
        const category = await Category.getCategory();
        res.status(200).json({
            status: true,
            data: category,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}