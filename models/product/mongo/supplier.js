const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});
const supplier = mongoose.model("supplier", supplierSchema);
module.exports = supplier;