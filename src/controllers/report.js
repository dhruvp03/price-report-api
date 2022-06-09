const Report = require('../models/report')
const AggregateReport = require('../models/aggregateReport')

module.exports.sendReport = async (req,res) => {
    
    try {

        if(!req.body.reportDetails){
            return res.status(400).send('Please send reportDetails')
        }
        const report = Report({
            ...req.body.reportDetails,
            userID:req.user._id
        })

        await report.save()
        const marketID = req.body.reportDetails.marketID
        const cmdtyID = req.body.reportDetails.cmdtyID
        let aggregateReport = await AggregateReport.findOne({marketID,cmdtyID})

        if(!aggregateReport){
            aggregateReport = new AggregateReport({
                cmdtyName: report.cmdtyName,
                cmdtyID: report.cmdtyID,
                marketID: report.marketID,
                marketName:report.marketName,
                priceUnit: report.priceUnit,
                price: report.price,
                reportNum: 1
            })
            aggregateReport.users = aggregateReport.users.concat({user:req.user._id})
            await aggregateReport.save()

        }
        else{
            let newMeanPrice;
            let oldTotalPrice = (aggregateReport.price)*(aggregateReport.reportNum)
            aggregateReport.reportNum += 1;
            newMeanPrice = (oldTotalPrice + report.price)/(aggregateReport.reportNum);

            aggregateReport.price = newMeanPrice;

            if(!aggregateReport.users.includes(req.user._id)){
                aggregateReport.users = aggregateReport.users.concat({user:req.user._id})
            }

            await aggregateReport.save()

        }
        const reportID = aggregateReport._id
        console.log(reportID)
        res.status(200).send({
            status:"success",
            reportID
        })
    }catch(e){
        console.log(e)
        res.status(500).send()
    }

}

module.exports.getAggregateReport = async (req,res) => {
    const _id = req.query.reportID

    try {
        const aggregateReport = await AggregateReport.findOne({_id})
        if(!aggregateReport){
            return res.status(404).send('No such report')
        }


        const return_dict = {
            _id: aggregateReport._id,
            cmdtyName: aggregateReport.cmdtyName,
            cmdtyID: aggregateReport.cmdtyID,
            marketID: aggregateReport.marketID,
            marketName: aggregateReport.marketName,
            users: aggregateReport.users,
            timestamp: aggregateReport.updatedAt,
            priceUnit: aggregateReport.priceUnit,
            price: aggregateReport.price
        }

        res.status(200).send(return_dict)
    }catch(e){
        console.log(e)
        res.status(500).send()
    }
}
