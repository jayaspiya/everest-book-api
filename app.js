const express = require('express')
const app = express()
const port = 3500
app.use(express.json())

app.get('/', function(req, res){
    res.send("This is Everest Book API")
    res.end()
})

const userRoutes = require('./routes/userRoutes.js')
app.use(userRoutes)

app.listen(port,()=>{
    console.log(`Listening at port localhost:${port}`)
})