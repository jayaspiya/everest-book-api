const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    address: String,
    phone: String,
    password: String
})

const Users = mongoose.model('Users', userSchema )

module.exports = Users