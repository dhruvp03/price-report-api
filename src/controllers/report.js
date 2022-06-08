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
            //Create the aggregate report
        }
        else{
            //Retrieve and average the aggregate report
        }
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