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
            type: mongoose.Types.ObjectId,
            required: true
        }
    }],
    priceUnit: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    }
},{ timestamps: true })

const aggregateReport = mongoose.Model('aggregateReport',aggregateReportSchema)

module.exports = aggregateReport