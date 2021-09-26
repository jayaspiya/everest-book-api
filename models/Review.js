const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    // User ID
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // Book ID
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    // Rating Range 1-5
    rating:{
        type: Number,
        min: 1,
        max: 5
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Review", reviewSchema)