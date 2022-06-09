const mongoose = require('mongoose')

const connectionURL = "mongodb://localhost:27017/price-api"

module.exports.connectDatabase = async () => {
    const mongooseOpts = {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }

    await mongoose.connect(connectionURL,mongooseOpts)
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.close();

}