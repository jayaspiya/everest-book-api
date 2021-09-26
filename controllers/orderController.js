const Order = require("../models/Order.js")
const User = require("../models/User.js")
const {success, failure} = require("../utils/messageJson.js")

exports.get_order = async function(req,res){
    // const order = await Order.find().populate([{path:"orderBook.bookId", select:"title price"}, {path: "user", select:"email"}])
    const order = await Order.find().populate("user orderBook.bookId").sort({createdAt: -1})
    res.json(success("success", order))
    res.end()
}

exports.add_order = async function(req,res){
    try {
        const userId = req.user._id
        const orderBook = req.body.orderBook
        // Calculate Total Quantity and Amount
        const rateList = orderBook.map((order)=>{
            return order.price
        })
        const qtyList = orderBook.map((order)=>{
            return order.qty
        })
        let totalAmount = 0
        let totalQuantity = 0
        qtyList.forEach((qty, index) => {
            totalQuantity += qty
            totalAmount += qty * rateList[index]
        })
        const order = new Order({
            user: userId,
            orderBook,
            totalAmount,
            totalQuantity
        })
        await order.save()
        // Empty Cart
        await User.updateOne({_id: userId},{
            cart: []
        })
        res.json(success("New Order Placed"))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.complete_order = async function(req,res){
    try {
        const _id = req.params.id
        const status = "completed"
        await Order.updateOne({_id},{status})
        res.json(success("Order Completed"))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.cancel_order = async function(req,res){
    try {
        const _id = req.params.id
        const status = "canceled"
        await Order.updateOne({_id},{status})
        res.json(success("Order Canceled"))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.delete_order = async function(req,res){
    try {
        const _id = req.params.id
        await Order.deleteOne({_id})
        res.json(success("Order Deleted"))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.get_order_by_user = async function(req,res){
    try{
        const userId = req.user._id
        const order = await Order.find({user: userId}).populate("user orderBook.bookId").sort({createdAt: -1})
        res.json(success("Ordered Fetched", order))
    }catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}