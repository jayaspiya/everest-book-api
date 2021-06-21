const mongoose = require('mongoose')
require('../utils/dbConnection.js')

const adminSchema = new mongoose.Schema({
    username: String,
    phone: String,
    password: String
})

const admin = mongoose.model('admins',adminSchema)
 
module.exports = admin