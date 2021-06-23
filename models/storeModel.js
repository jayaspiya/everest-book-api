const mongoose = require('mongoose')
const storeSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String
    },
    location: {
        type: String
    },
    inStoreBooks:{
        type: String
    },
    manager:{
        type: String
    },
    phone: {
        type: String
    },
})

module.exports = mongoose.model('Store',storeSchema)