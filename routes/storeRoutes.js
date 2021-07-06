const router = require("express").Router()
const bcrypt = require("bcryptjs")
const Store = require("../models/Store.js")
const jwt = require("jsonwebtoken")
const auth = require("../utils/auth.js")
const tokenKey = process.env.TOKEN_KEY

// TODO: Update Store data

router.post('/register', async function(req, res){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(req.body.password, salt)
        const store = new Store({
            email: req.body.email,
            password: hashed,
            location: req.body.location,
            manager: req.body.manager
        })
        const storeRes = await store.save()
        res.sendStatus(201)
    } catch (err) {
        res.send(err)
    }
    res.end()
})

router.post('/login', async function(req, res){
    try {
        const store = await Store.findOne({email: req.body.email})
        if(store){
            const validLogin = await bcrypt.compare(req.body.password, store.password)
            if(validLogin){
                const accessToken = jwt.sign({_id: store._id}, tokenKey)
                res.json({accessToken})
            }
            else{
                res.statusCode(406)
            }
        }
        else{
            res.statusCode(404)
        }
    } catch (err) {
        res.send(err)
    }
    res.end()
})

router.get("/profile",auth.verifyStore, async (req, res)=>{
    const store = await Store.find({_id: req.user._id})
    res.json(store)
    res.end()
})

module.exports = router