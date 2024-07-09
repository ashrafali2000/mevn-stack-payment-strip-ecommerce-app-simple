const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        },
    },
    password: {
        type: String,
        required:true,
        minlength: 3
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    phoneNumber: {
        type: Number,
        required: false
    },
    address:  {
            street: String,
            city: String,
            country: String,
            zipCode: String
    },
    orders: [{
        name: {
            type: String,
        },
        address: {
                street: String,
                city: String,
                country: String,
                zipCode: String
        },
        phoneNumber: {
            type: Number
        },
        products: [
            {
                productId: mongoose.Schema.Types.ObjectId,
                quantity: Number,
                price: Number
            }
        ],
        totals: {
            type: Number
        },
        chargeDetails: {
            id: String,
            amount: String,
            currency: String,
            description: String,
            card: String,
            status: String

        },
        orderDate: {
            type: Date,
            default: Date.now()
        }
    }],
    versionKey: false
},
{
    timestamps: {
        createdAt: 'created_at'
    }
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, {expiresIn: 3600})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.deleteToken = async function(token) {
    const user = this
    await user.tokens.splice(user.tokens.findIndex(token => token.token == token), 1)
    return user
}

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('users', userSchema);

module.exports = User;