const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
   try {
       let token = req.headers['authorization'];
       if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
       const decoded = jwt.verify(token, process.env.JWT_KEY)
       const user = await User.findOne({ _id: decoded._id})
       req.token = token
       req.user = {
           id: user.id,
           email: user.email
       }
       next()
    } catch (error) {
       console.log(error)
       res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = auth;

