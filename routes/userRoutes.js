const express = require('express')
const router = express.Router()

const User = require('../models/userModel.js')


router.get('/user', async function(req, res){
    const users  = await User.find()
    res.send(users)
    res.end()
})

module.exports = router