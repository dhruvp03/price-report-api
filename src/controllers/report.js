const Report = require('../models/report')
const AggregateReport = require('../models/aggregateReport')

const sendReport = async (req,res) => {
    if(!req.body.reportDetails){
        res.status(400).send('Please send reportDetails')
    }
    const report = Report(req.body.reportDetails)

    try {
        await report.save()
        const marketID = req.body.reportDetails.marketID
        const cmdtyID = req.body.reportDetails.cmdtyID
        let aggregateReport = await AggregateReport.findOne({marketID,cmdtyID})

        if(!aggregateReport){
            const aggregateReport = AggregateReport({
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

            // const return_dict = {
            //     _id: aggregateReport._id,
            //     cmdtyName: aggregateReport.cmdtyName,
            //     cmdtyID: aggregateReport.cmdtyID,
            //     marketID: aggregateReport.marketID,
            //     marketName: aggregateReport.marketName,
            //     users: aggregateReport.users,
            //     timestamp: aggregateReport.updatedAt,
            //     priceUnit: aggregateReport.priceUnit,
            //     price: aggregateReport.price
            // }

            // res.status(200).send({aggregateReport:return_dict})

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

        res.status(200).send({aggregateReport:return_dict})
    }catch(e){
        res.status(500).send(e)
    }

}

const getAggregateReport = async (req,res) => {
    const _id = req.query.reportID

    try {
        const aggregateReport = await AggregateReport.findByID(_id)
        if(!aggregateReport){
            return res.status(404).send('No such report')
        }
        res.status(200).send(aggregateReport)
    }catch(e){
        res.status(500).send(e)
    }
}

module.exports = {
    sendReport,
    getAggregateReport
}