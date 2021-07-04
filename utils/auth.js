const jwt = require("jsonwebtoken")
const tokenKey = process.env.TOKEN_SECRET
const User = require("../models/User.js")
module.exports = async (req,res,next) =>{
    try {
        const accessToken = req.headers.authorization.split(" ")[1]
        const authUser = jwt.verify(accessToken, tokenKey)
        const user = await User.findOne({_id: authUser._id })
        req.user = user
        next()
    } catch (err) {
        console.log(err)
    }
}