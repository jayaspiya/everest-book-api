const mongoose = require("mongoose")
require('dotenv').config()
// if .env is not defined, process.env.DB_URI -> undefined
// Change URI to "127.0.0.1:27017" if you are using Mongodb Community Server
const URI = process.env.DB_URI 
mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})