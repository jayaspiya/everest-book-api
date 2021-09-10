const mongoose = require("mongoose")

const orderItemSchema = mongoose.Schema({
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    totalAmount:{
        type: Number
    },
    totalQuantity:{
        type: Number
    },
    status: {
        type: String,
        enum: ["completed", "pending"],
        default: "pending"
    },
    orderBook:[orderItemSchema],
})

module.exports = mongoose.model("Order", orderSchema)