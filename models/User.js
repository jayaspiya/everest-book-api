const mongoose = require('mongoose')
// TODO: Add User Cart, saved items
const userSchema = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    password:{
        type: String,
        required: true,
    },
    joinedDate:{
        type: Date,
        default: Date.now,
        select: false
    },
    firstname:{
        type: String,
        default:""
    },
    lastname:{
        type:String,
        default:""
    },
    address:{
        type: String,
        default:""
    },
    phone: {
        type: String,
        default:""
    },
    profile:{
        type: String
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'other'],
    },
    birthdate:{
        type: Date
    }
})

module.exports = mongoose.model('User',userSchema)