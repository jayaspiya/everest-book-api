const express = require('express')
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
    const user = new User(req.body)
    await user.save()
    res.end()
})

module.exports = router