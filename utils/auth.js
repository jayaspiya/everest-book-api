const jwt = require("jsonwebtoken")
const tokenKey = process.env.TOKEN_KEY
const User = require("../models/User.js")
const Store = require("../models/Store.js")

module.exports.verifyUser = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization
        const accessToken = authHeader && authHeader.split(" ")[1]
        if (accessToken == null) return res.sendStatus(401)
        const authUser = jwt.verify(accessToken, tokenKey)
        const user = await User.findOne({_id: authUser._id })
        if(user){
            req.user = user
            next()
        }
        else{
            res.sendStatus(401)
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.verifyStore = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization
        const accessToken = authHeader && authHeader.split(" ")[1]
        if (accessToken == null) return res.sendStatus(401)
        const authUser = jwt.verify(accessToken, tokenKey)
        const user = await Store.findOne({_id: authUser._id })
        if(user){
            req.user = user
            next()
        }
        else{
            res.sendStatus(401)
        }
    } catch (err) {
        console.log(err)
    }
}