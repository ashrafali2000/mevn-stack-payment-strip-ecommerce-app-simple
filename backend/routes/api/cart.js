const express = require('express')
const Cart = require('../../models/Cart')
const auth = require('../../middleware/auth')

const router = express.Router()

router.post("/", auth, async (req, res) => {
    const { id, price,quantity } = req.body
    const userId = req.user.id

    try {
        let cart = await Cart.findOne({userId})
        if (cart) {
            let itemIndex = cart.products.findIndex(product => product.id == id)

            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity = quantity;
                cart.products[itemIndex] = productItem;
                console.log(productItem)
            } else {
                cart.products.push({ id, price, quantity });
            }

            cart = await cart.save()
            return res.status(201).send(cart)
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [{ id, price, quantity }]
            });
            let data = await newCart.save()
            return res.status(201).send(data)
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong")
    }
});

router.get('/getCart', auth, async (req, res) => {
    const userId = req.user.id
    const cart = await Cart.findOne({userId});
    req.cart = cart
    res.status(200).send(req.cart)
});

router.delete('/deleteProduct/:id', auth, async (req, res) => {
    const userId = req.user.id;
    const cart = await Cart.findOne({userId});
    const product = cart.products.find(product => product.prouctId = req.params.id)
    product.quantity > 1 ? product.quantity-- : await cart.products.remove(product);
    await cart.save()
    res.status(200).send();
});

router.delete('/emptyCart', auth, async (req, res) => {
    const userId = req.user.id
    const cart = await Cart.findOne({userId});
    await Cart.deleteOne({_id: cart.id})
    res.status(200).send("Cart for user ID: " + userId + " is empty");
})

/////////
router.get('/delete', async (req, res) => {
    await Cart.deleteMany()
})
module.exports = router;