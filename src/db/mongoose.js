const mongoose = require('mongoose')

const connectionURL = "mongodb://localhost:27017/price-api"

try {
    await mongoose.connect(connectionURL)
} catch(e) {
    console.log(e)
}