const User = require('../models/user')
const get_jwt_token = require('../utils/auth')

const userRegister = async (req,res) => {

    const user = new User(req.body)
    try{
        await user.save()
        const token = await get_jwt_token(user)

        const return_dict = {
            name: user.name,
            email: user.email,
            token
        }

        res.status(200).send(return_dict)

    }catch(e){
        res.status(500).send(e)
    }

}

const userLogin = async (req,res) => {
    try {
        const user = await User.getUserByCreds(req.body.email, req.body.password)
        const token = await get_jwt_token(user)
        const return_dict = {
            name: user.name,
            email: user.email,
            token
        }

        res.status(200).send(return_dict)
    }catch(e) {
        res.status(400).send(e)
    }
}

module.exports = {
    userRegister,
    userLogin
}