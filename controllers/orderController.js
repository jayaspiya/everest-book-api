const Order = require("../models/Order.js")
const {success, failure} = require("../utils/messageJson.js")

exports.get_order = async function(req,res){
    const order = await Order.find()
    // .sort({createdAt: -1})
    res.json(success("success", order))
    res.end()
}

exports.add_order = async function(req,res){
    try {
        const userId = req.user._id
        const orderBook = req.body.orderBook
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
        res.json(success("New Order Placed"))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}