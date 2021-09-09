const mongoose = require("mongosse")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    items:[
        {
            bookId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"  
            },
            quantity:{
                type: Number
            }
        }
    ],
    totalAmount:{
        type: Number
    },
    totalQuantity:{
        type: Number
    },
    status: {
        type: String,
        enum: ["completed", "pending", "confirmed"],
        default: "confirmed"
    }
})

module.exports = mongoose.model("Order", orderSchema)