const jwt = require("jsonwebtoken")
const tokenKey = process.env.TOKEN_KEY
const User = require("../models/User.js")
const Store = require("../models/Store.js")
const {failure} = require("../utils/messageJson.js")

module.exports.checkUserLoggedIn = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if(authHeader){
        const accessToken = authHeader && authHeader.split(" ")[1]
        const authUser = jwt.verify(accessToken, tokenKey)
        const user = await User.findOne({
            _id: authUser._id
        })
        if (user) {
            req.user = user
        }}
        next()
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

module.exports.verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.body.headers.Authorization
        const accessToken = authHeader && authHeader.split(" ")[1]
        if (accessToken == null) return res.json(failure("Unauthorized"))
        const authUser = jwt.verify(accessToken, tokenKey)
        const issuedAt = new Date(authUser.iat * 1000)
        const user = await User.findOne({
            _id: authUser._id
        }).select("+passwordSetDate")
        passwordSetDate = new Date(user.passwordSetDate)
        if (user) {
            if(issuedAt>=passwordSetDate){
                req.user = user
                next()
            }
            else{
                // Password Changed
                res.json(failure("Unauthorized")) 
            }
        } else {
            res.json(failure("Unauthorized"))
        }
    } catch (err) {
        console.log(err)
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

module.exports.verifyStore = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.body.headers.Authorization
        const accessToken = authHeader && authHeader.split(" ")[1]
        if (accessToken == null) return res.json(failure("Unauthorized"))
        const authUser = jwt.verify(accessToken, tokenKey)
        const user = await Store.findOne({
            _id: authUser._id
        })
        if (user) {
            req.user = user
            next()
        } else {
            res.json(failure("Unauthorized"))
        }
    } catch(err) {
        console.log(err)
        res.json(failure("Unauthorized"))
    }
}