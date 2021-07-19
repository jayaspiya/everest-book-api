const mongoose = require('mongoose')
const capitalize = require("../utils/capitalize.js")
const opts = {
    toJSON: {
        getters: true
    }
}
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
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
    cover:{
        front:String,
        back: String,
        side: String
    }
},opts)
bookSchema.path("title").get(v=>{
    return capitalize(v)
})
bookSchema.path("title").set(v=>{
    return v.toLowerCase()
})
bookSchema.path("author").get(v=>{
    return capitalize(v)
})
bookSchema.path("author").set(v=>{
    return v.toLowerCase()
})

module.exports = mongoose.model("Book", bookSchema)