const express = require('express');
const User = require('../../models/User');
const Cart = require('../../models/Cart');
const auth = require('../../middleware/auth');

const router = express.Router();

router.post('/registerOrder', auth, async(req, res) =>{
    const userId = req.user.id;
    let user = await User.findOne({_id: userId})
    let token = req.token
    let cart = await Cart.findOne({userId})
    try {
        user.orders.push({
            name: req.body.name,
            email: req.body.email,
            address: {
                street: req.body.street,
                city: req.body.city,
                country: req.body.country,
                zipCode: req.body.zipCode,
            },
            phoneNumber: req.body.phoneNumber,
            products: cart.products,
            total: req.body.total
        })

        if (!user.phoneNumber) {
            user.phoneNumber = req.body.phoneNumber;
        }
        if (!user.address.country) {
            user.address = {
                street: req.body.street,
                city: req.body.city,
                country: req.body.country,
                zipCode: req.body.zipCode
            }
        }
        await user.save();
        res.header("authorization", token).status(201).send({user});
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;