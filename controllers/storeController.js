const bcrypt = require("bcryptjs")
const Store = require("../models/Store.js")
const jwt = require("jsonwebtoken")
const {success, failure} = require("../utils/messageJson.js")
const tokenKey = process.env.TOKEN_KEY

exports.register_new_store = async function(req, res){
    const checkStore = await Store.findOne({email: req.body.email})
	if (checkStore) {
        res.json(failure("Email already exist"))
	}
    else{
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(req.body.password, salt)
        const store = new Store({
            email: req.body.email,
            password: hashed,
            phone: req.body.phone,
            manager: req.body.manager,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            branch: req.body.branch,
            showOnMap: req.body.showOnMap
        })
        await store.save()
        res.json(success("New Store Registered."))
    }
    res.end()
}

exports.login_store = async function(req, res){
    const store = await Store.findOne({email: req.body.email})
    if(store){
        const validLogin = await bcrypt.compare(req.body.password, store.password)
        if(validLogin){
            const _id = store._id
            const accessToken = jwt.sign({_id}, tokenKey)
            res.json({
                message: "Login successful.",
                accessToken,
                success: true,
            })
        }
        else{
            // Incorrect Password
            res.json(failure("Invalid Credential"))
        }
    }
    else{
        // Incorrect Email
        res.json(failure("Invalid Credential"))
    }
    res.end()
}

exports.get_store_detail = async (req, res)=>{
    const store = await Store.find({_id: req.user._id})
    res.json(success("Successful", store))
    res.end()
}