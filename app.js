const express = require('express')
const app = express()
const port = 3200
app.use(express.json)

// const userRoutes = require('./routes/userRoutes.js')
// app.use(userRoutes)

app.listen(port,()=>{
    console.log(`Listening at port localhost:${port}`)
})