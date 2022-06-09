
const unitConversion = async (req,res,next) => {
    try{
        let reportDetails = req.body.reportDetails;
        if(!reportDetails) {
            throw new Error('Please send report details');
        }
        reportDetails.price = (reportDetails.price)/(reportDetails.convFctr);
        reportDetails.convFctr = 1;
        reportDetails.priceUnit = "Kg";
    }catch(e){
        throw new Error('Error '+ e)
    }
    next()
}

module.exports = unitConversion