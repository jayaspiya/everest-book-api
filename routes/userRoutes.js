const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.js')

router.get("/",function(req,res){
    res.send("User Get")
    res.end()
})

router.post("/register",async function(req,res){
    try {
        const hashed = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: hashed
        })
        const userRes = await user.save()
        res.send(userRes)
    } catch (error) {
        res.send(error)
    }
    res.end()
})

router.post("/login", async function(req, res){
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const validLogin = await bcrypt.compare(req.body.password, user.password)
            if(validLogin){
                res.send("Corrent Password")
            }
            else{
                res.send("Incorrent Password")
            }
        }
        else{
            res.send("Not Found")
        }
    } catch (error) {
        res.send(err)
    }
    res.end()
})


module.exports = router