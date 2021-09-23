'use strict';
const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Include the product name"],
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
const Product = mongoose.model("Product", productSchema);
module.exports = Product;