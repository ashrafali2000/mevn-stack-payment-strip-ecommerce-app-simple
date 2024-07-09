const express = require('express')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const auth = require('../../middleware/auth')
const User = require('../../models/User')

const router = express.Router()

router.post('/charge', auth, async (req, res) => {
    let userId = req.user.id
    let user = await User.findOne({_id: userId})
    const newCharge = {
        amount: req.body.amount,
        currency: req.body.currency,
        source: req.body.token,
        description: req.body.description,
    };

   try {
        await stripe.charges.create(newCharge, (err, charge) => {
            let lastOrder = user.orders[user.orders.length-1]
            if (err){
                res.json({error: err, charge: false});
            } else {
                lastOrder.chargeDetails = {
                    id: charge.id,
                    amount: charge.amount,
                    currency: charge.currency,
                    description: charge.description,
                    card: charge.payment_method_details.card.last4,
                    status: charge.status
                }
                console.log(user.orders[user.orders.length-1].chargeDetails)
                res.json({error: false, charge: charge});
            }
        })
   } catch (err) {
       res.json({ error: err, charge: false });
   }
});

module.exports = router;