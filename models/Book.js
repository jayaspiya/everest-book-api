const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        set: v => v.toLowerCase()
    },
    author:{
        type: String,
        required: true,
        set: v => v.toLowerCase(),
    },
    isbn: {
        type: String,
        required: true
    },
    synopsis:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    releasedYear:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        default: 0
    },
    addedDate:{
        // To filter latest books
        type: Date,
        default: Date.now,
        select: false
    },
    tags:[
        {
            type: String
        }
    ],
})


module.exports = mongoose.model("Book", bookSchema)