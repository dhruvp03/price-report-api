const mongoose = require('mongoose')

const aggregateReportSchema = new mongoose.Schema({
    cmdtyName: {
        type: String,
        required: true
    },
    cmdtyID: {
        type: String,
        required:true
    },
    marketID: {
        type: String,
        required: true
    },
    marketName: {
        type:String,
        required: true
    },
    users: [{
        user:{
            type: mongoose.Types.ObjectId
        }
    }],
    priceUnit: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    reportNum:{
        type: Number,
        default:0
    }
},{ timestamps: true })

const aggregateReport = mongoose.model('aggregateReport',aggregateReportSchema)

module.exports = aggregateReport