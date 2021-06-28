const express = require('express')
const bcryptjs = require("bcryptjs")

const router = express.Router()
const User = require('../models/userModel.js')

router.get('/', async function(_, res){
    const users  = await User.find()
    res.send(users)
    res.end()
})

router.get('/:userId', async function(req, res){
    const users  = await User.findById(req.params.userId)
    res.send(users)
    res.end()
})

router.post('/', async function(req,res){
    const {email,username, password, firstname, lastname, gender,birthdate, Address} = req.body
    // bcryptjs.hash("jayas", 10,function(err,hash){
    //     console.log(hash)
    // })
    const user = new User({email,username, password, firstname, lastname, gender,birthdate, address})
    try{
        await user.save()
        res.status(201).json({
            message: "User Post Successfully"
        })
    }
    catch(err){
       res.status(500).json({message: err})
    }
    res.end()
})

module.exports = router