const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) => {
    const token = req.headers('Authorization').replace('Bearer ', '')
    
    if(!token) {
        res.status(400).send('Please Authenticate')
    }

    const payload = await jwt.verify(token, 'SecretKey123')

    const user = await User.findOne({_id: payload._id, 'tokens.token':token})

    if(!user){
        res.status(400).send('Please register!')
    }

    req.user = user
    req.token = token
    next()
}