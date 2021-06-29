const mongoose = require('mongoose')

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
        default: Date.now
    },
    firstname:{
        type: String,
    },
    lastname:{
        type:String,
    },
    address:{
        type: String,
    },
    phone: {
        type: String,
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