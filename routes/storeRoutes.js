const express = require("express")
const router = express.Router()
const Store = require("../models/storeModel.js")

router.get('/',async function(_,res){
    const store = await Store.find()
    res.send(store)
    res.end()
})

router.post('/', async function(req,res){
    const store = new Store(req.body)
    await store.save()
    res.end()
})

module.exports = router