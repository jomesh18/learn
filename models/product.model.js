const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the product name']
    },
    qty: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
