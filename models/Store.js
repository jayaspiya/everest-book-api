const mongoose = require('mongoose')
const storeSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    manager:{
        type: String,
        required: true
    },
    inStoreBooks:{
        type: String
    },
    phone: {
        type: String
    },
})

module.exports = mongoose.model('Store',storeSchema)