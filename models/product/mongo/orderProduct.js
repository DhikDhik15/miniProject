const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderProductSchema = new Schema({
    name_product: {
        type: String,
        required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date_order: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},{
    timestamps: true
})
// const totalOrder = new Schema({
//     items: [orderProductSchema],
//     subTotal: {
//         default: 0,
//         type: Number
//     }
// },{
//     timestamps: true
// })
const orderProduct = mongoose.model("order_product", orderProductSchema);
module.exports = orderProduct;