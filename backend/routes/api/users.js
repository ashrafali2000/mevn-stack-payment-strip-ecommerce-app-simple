const express = require('express')
const auth = require('../../middleware/auth')
const User = require('../../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        let checkUser = User.findOne({
            email: req.body.email
        });
        if (req.body.email === checkUser.email) {
            return res.status(400).json({
                msg: "Email is already registered."
            });
        }
        const newUser = new User(req.body)
        await newUser.save()
        const token = await newUser.generateAuthToken()
        const user = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body
        const loggedUser = await User.findByCredentials(email, password)
        if (!loggedUser) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await loggedUser.generateAuthToken()
        const user = {
            id: loggedUser._id,
            name: loggedUser.name,
            email: loggedUser.email,
            phoneNumber: loggedUser.phoneNumber || '',
            street: loggedUser.address.street || '',
            city: loggedUser.address.city || '',
            country: loggedUser.address.country || '',
            zipCode: loggedUser.address.zipCode || '',
        }
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id})
        const token = req.token
        user.deleteToken(token)
        res.sendStatus(200);
        await user.save()
    }   catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router