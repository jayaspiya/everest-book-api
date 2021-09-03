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
    manager:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    latitude:{
        type: String,
        default:"27.695410573378158"
    },
    longitude:{
        type: String,
        default: "84.42346769727541"
    },
    branch: {
        type: String,
        default: "Main"
    },
    showOnMap:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Store',storeSchema)