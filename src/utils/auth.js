const jwt = require('jsonwebtoken')

const generateAuthToken = async (user) => {
    try{
        const payload = {
            _id: user._id.toString()
        }
        const token = await jwt.sign(payload,'SecretKey123')
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token
    }
    catch(e){
        throw new Error(e)
    }
}

module.exports = generateAuthToken