const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart",
        // type: Number,
        required: true
    },
    date_transaction: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
},{
    timestamps: true,
})
module.exports = mongoose.model('buyer', buyerSchema);