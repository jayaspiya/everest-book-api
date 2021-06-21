const mongoose = require('mongoose')
require('../utils/dbConnection.js')
const userSchema = new mongoose.Schema({
    username: String,
    address: String,
    phone: String,
    password: String
})

const User = mongoose.model('users', userSchema )

module.exports = User