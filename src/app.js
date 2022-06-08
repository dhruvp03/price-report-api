const express = require('express')
const userRouter = require('./routers/user')
const reportRouter = require('./routers/report')

const app = express()

app.use(express.json())

app.use(userRouter)
app.use(reportRouter)


module.exports = app



