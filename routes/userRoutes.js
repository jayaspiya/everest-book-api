const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')

router.get("/",function(req,res){
    res.send("User Get")
    res.end()
})

router.post("/register",async function(req,res){
    try {
        // const hashed = await bcrypt.hash(req.body.password, 12)
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })
        const userRes = await user.save()
        res.send(userRes)
    } catch (error) {
        res.send(error)
    }
    res.end()
})

router.post("/login", async function(req, res){
    const user = await User.findOne({email: req.body.email})
    if(user){
        if(user.password === req.body.password){
            res.send("Corrent Password")
        }
        else{
            res.send("Incorrent Password")
        }
    }
    else{
        res.send("Not Found")
    }
    res.end()
})


module.exports = router