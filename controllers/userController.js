const bcrypt = require("bcryptjs")
const User = require("../models/User.js")
const jwt = require("jsonwebtoken")
const tokenKey = process.env.TOKEN_KEY

exports.register_new_user = async function(req,res){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(req.body.password, salt)
        const user = new User({
            email: req.body.email,
            password: hashed
        })
        const userRes = await user.save()
        res.sendStatus(201)
    } catch (error) {
        res.send(error)
    }
    res.end()
}

exports.login_user = async function(req, res){
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const validLogin = await bcrypt.compare(req.body.password, user.password)
            if(validLogin){
                const accessToken = jwt.sign({_id: user._id}, tokenKey)
                res.json({accessToken})
            }
            else{
                res.statusCode(406)
            }
        }
        else{
            res.statusCode(404)
        }
    } catch (error) {
        res.send(err)
    }
    res.end()
}

exports.get_user_detail = async (req, res)=>{
    const user = await User.find({_id: req.user._id})
    res.json(user)
    res.end()
}

exports.update_user_detail = async (req, res)=>{
    await User.updateOne({_id: req.user._id},{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        phone: req.body.phone,
        gender: req.body.gender,
        birthdate: req.body.birthdate
    })
    res.end()
}