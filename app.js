const express = require('express')
const userRouter = require('./src/routers/user')

const app = express()

app.use(express.json())

app.use(userRouter)

app.get('',(req,res)=>{
    res.send('Server is up!')
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})



