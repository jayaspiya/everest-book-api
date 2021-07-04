const jwt = require("jsonwebtoken")
const tokenKey = process.env.TOKEN_KEY
const User = require("../models/User.js")
module.exports = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization
        const accessToken = authHeader && authHeader.split(" ")[1]
        if (accessToken == null) return res.sendStatus(401)
        const authUser = jwt.verify(accessToken, tokenKey)
        const user = await User.findOne({_id: authUser._id })
        req.user = user
        next()
    } catch (err) {
        console.log(err)
    }
}