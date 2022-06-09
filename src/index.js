const app = require('./app')
const db = require('./db/mongoose')

db.connectDatabase()

const port = process.env.port || 3000

app.listen(port,()=>{
    console.log("Server is up on port "+ port)
})