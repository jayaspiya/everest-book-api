const express = require('express')
const router = express.Router()
const User = require('../models/userModel.js')

router.get('/user', async function(req, res){
    console.log("User Get Request")
    const users  = await User.find()
    res.send(users)
    res.end()
})

router.post('/user', async function(req,res){    
    console.log("User Post Request")
    const user = new User(req.body)
    await user.save()
    res.send("User added")
    res.end()
})

module.exports = router