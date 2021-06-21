const express = require("express")
const router = express.Router()
const Admin = require("../models/adminModel.js")
router.get('/admin',function(req,res){
    console.log("Admin Get Request")
    Admin.find().then((data)=>{
        res.send(data)
        res.end()
    })
})

router.post('/admin', function(req,res){
    console.log("Admin Post Request")
    const admin = new Admin(req.body)
    admin.save()
    res.end()
})

module.exports = router