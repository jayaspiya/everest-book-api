const express = require('express')
const app = express()
const port = 3500
app.use(express.json())

const userRoutes = require('./routes/userRoutes.js')
const adminRoutes = require("./routes/adminRoutes.js")

app.use('/', function(req,res,next){
    console.log(`${req.url} ${req.method}`)
    next()
})

app.use('/user',userRoutes)
app.use('/admin',adminRoutes)

app.listen(port,()=>{
    console.log(`Listening at port localhost:${port}`)
})