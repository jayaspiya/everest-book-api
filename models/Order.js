const mongoose = require("mongoose")

const orderItemSchema = mongoose.Schema({
    // Book ID
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"  
    },
    qty:{
        type: Number
    },
    price:{
        type: Number
    }
})

const orderSchema = mongoose.Schema({
    // User ID
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    // Calculated By Controller
    totalAmount:{
        type: Number
    },
    totalQuantity:{
        type: Number
    },
    status: {
        type: String,
        enum: ["completed", "pending", "canceled"],
        default: "pending"
    },
    // Order Book Array Of Order Item
    orderBook:[orderItemSchema],
})

module.exports = mongoose.model("Order", orderSchema)