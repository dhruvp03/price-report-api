const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    marketID: {
        type:String,
        required: true
    },
    marketName: {
        type:String,
        required: true
    },
    cmdtyID: {
        type:String,
        required: true
    },
    marketType: {
        type: String,
        required: true
    },
    cmdtyName: {
        type: String,
        required: true
    },
    priceUnit: {
        type:String,
        required: true
    },
    convFctr: {
        type:Number,
        required: true
    },
    price: {
        type:Number,
        required:true
    },
    userID: {
        type: mongoose.Types.ObjectId,
        required:true
    }
})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report