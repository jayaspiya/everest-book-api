const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    rating:{
        type: Number,
        min: 0,
        max: 4
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Review", reviewSchema)