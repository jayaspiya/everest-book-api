const express = require('express')
const app = express()
const port = 3500
app.use(express.json())

const userRoutes = require('./routes/userRoutes.js')
const adminRoutes = require("./routes/adminRoutes.js")

app.use(userRoutes)
app.use(adminRoutes)

app.listen(port,()=>{
    console.log(`Listening at port localhost:${port}`)
})