'use strict';
const Category = require('../../models/product/mongo/category');

exports.getCategory = async () => {
    const category = await Category.find();
    return category;
}
exports.createCategory = async add => {
    const newCategory = await Category.create(add);
    return newCategory
}
