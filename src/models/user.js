const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const bcrypt = require('bcryptjs/dist/bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },

    email: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    },

    tokens: [{
        token:{
            type:String
        }
    }]
})

UserSchema.statics.getUserByCreds = async (email,password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error('User does not exist')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) {
        throw new Error('Invalid Password or Username')
    }
    return user
}

UserSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
