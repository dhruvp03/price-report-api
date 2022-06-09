const mongoose = require('mongoose')

const connectionURL = "mongodb://localhost:27017/price-api"

module.exports.connectDatabase = async () => {
    const mongooseOpts = {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }

    await mongoose.connect(connectionURL,mongooseOpts)
    console.log('connected db')
}

module.exports.closeDatabase = async () => {
    await mongoose.connection.close();
    console.log('closed connection')

}

module.exports.dropAndCloseDatabase = async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    console.log('Closed and dropped db')
}