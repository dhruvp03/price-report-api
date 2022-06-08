const express = require('express')

const app = express()

app.use(express.json())

app.get('',(req,res)=>{
    res.send('Server is up!')
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})



