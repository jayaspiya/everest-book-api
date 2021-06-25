const express = require('express')
const cors = require("cors")
// Routes
const userRoutes = require('./routes/userRoutes.js')
const storeRoutes = require("./routes/storeRoutes.js")
const bookRoutes = require("./routes/bookRoutes.js")

require("./utils/dbConnection.js")

const app = express()
const port = process.env.PORT || 8080
app.use(express.json())

app.use(cors())

app.use('/', function(req,res,next){
    console.log(req.method, req.url)
    next()
})

app.use('/user',userRoutes)
app.use('/store',storeRoutes)
app.use('/book', bookRoutes)

app.listen(port,()=>{
    console.log(`Listening at port http://localhost:${port}`)
})