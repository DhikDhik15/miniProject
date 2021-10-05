'use strict';
const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Include the product name"],
    es_indexed: true
  },
  category: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "category"

  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "supplier",
    required: true
  },
  stock: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true,
  },
 image: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true
  }
});
productSchema.plugin(mongoosastic);
const Product = mongoose.model("Product", productSchema)
module.exports = Product;