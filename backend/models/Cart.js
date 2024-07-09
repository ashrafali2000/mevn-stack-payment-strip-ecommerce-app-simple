const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        products: [
            {
                id: String,
                quantity: Number,
                price: Number
            }
        ],
        modifiedOn: {
            type: Date,
            default: Date.now()
        }
    },
    { timestamps: true }
);

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;