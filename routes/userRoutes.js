const express = require('express')
const router = express.Router()

router.get('/user', function(req, res){
    res.send("This is user request")
    res.end()
})

module.exports = router