const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            default: "Uncategorised",
            required: true
        },
        description: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        quantity: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: "Active",
            required: false
        },
        image: {
            type: Array,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        }
    },
    {
        versionKey: false
    });

const Product = mongoose.model('products', productSchema);

module.exports = Product;