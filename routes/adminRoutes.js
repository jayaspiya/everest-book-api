const express = require("express")
const router = express.Router()
const Admin = require("../models/adminModel.js")

router.get('/',async function(req,res){
    const admins = await Admin.find()
    res.send(admins)
    res.end()
})

router.post('/', async function(req,res){
    const admin = new Admin(req.body)
    await admin.save()
    res.end()
})

module.exports = router