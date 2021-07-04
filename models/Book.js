const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
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
    imageUrl:{
        type: String,
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
        default: Date.now
    },
    tags:[
        {
            type: String
        }
    ],
})

module.exports = mongoose.model("Book", bookSchema)