const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("Review", reviewSchema)