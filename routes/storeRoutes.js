const router = require("express").Router()
const bcrypt = require("bcryptjs")
const Store = require("../models/Store.js")

router.post('/register', async function(req, res){
    try {
        const hashed = await bcrypt.hash(req.body.password, 10)
        const store = new Store({
            email: req.body.email,
            password: hashed,
            location: req.body.location,
            manager: req.body.manager
        })
        const storeRes = await store.save()
        res.send(storeRes)
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
                res.send("Auth")
            }
            else{
                res.send("Not Auth")
            }
        }
        else{
            res.send('Not Found')
        }
    } catch (err) {
        res.send(err)
    }
    res.end()
})

module.exports = router