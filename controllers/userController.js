const bcrypt = require("bcryptjs")
const User = require("../models/User.js")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary.js")
const tokenKey = process.env.TOKEN_KEY


exports.register_new_user = async function(req,res){
    const checkUser = await User.findOne({email: req.body.email})
    if(checkUser){
        res.json({
            message: "Email already exist",
            success: false,
        })
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const {firstname, lastname, password, address, email, phone} = req.body
        const hashed = await bcrypt.hash(password, salt)
        const avatarUrl = `https://ui-avatars.com/api/?background=random&name=${firstname}+${lastname}`
        const user = new User({
            firstname: firstname,
            lastname: lastname,
            address: address,
            phone: phone,
            email: email,
            profile: avatarUrl,
            password: hashed
        })
        await user.save()
        res.json({
            message: "Registeration successful.",
            success: true,
        })
    }
    res.end()
}

exports.login_user = async function(req, res){
    const user = await User.findOne({email: req.body.email})
    if(user){
        const validLogin = await bcrypt.compare(req.body.password, user.password)
        if(validLogin){
            const accessToken = jwt.sign({_id: user._id}, tokenKey)
            res.json({
                message: "Login successful.",
                accessToken,
                success: true,
            })
        }
        else{
            res.json({
                success: false,
                message: "Invalid Credential"
            })
        }
    }
    else{
        res.json({
            success: false,
            message: "Invalid Credential"
        })
    }
    res.end()
}



exports.get_user_detail = async (req, res)=>{
    const user = await User.find({_id: req.user._id}).select("-password -cart")
    res.json({
        success: true,
        message: "Request successful",
        data: user
    })
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
    res.json({
        success: true,
        message: "Update successful",
    })
    res.end()
}
exports.add_to_cart = async (req,res) =>{
    const _id = req.user._id
    const user = await User.findById(_id)
    const isAdded = await user.addToCart(req.params.bookId)
    if(isAdded){
        res.json({
            success: true,
            message: "Book Added",
        })
    }
    else{
        res.json({
            success: false,
            message: "Book already in cart",
        })
    }
    res.end()
}

exports.get_cart = async (req,res) => {
    const _id = req.user._id
    const user = await User.findOne(_id).populate({path: "cart"})
    res.json({
        success: true,
        message: "Request successful",
        data: user.cart
    })
    res.end()
}


exports.update_profile_picture = async function(req,res){
    const formImage = req.files.profile
    const imagePath = formImage.tempFilePath
    const _id = req.user._id
    const profile = await cloudinary.uploadUserProfile(imagePath, _id)
    await User.updateOne({_id},{profile})
    res.json({
        success: true,
        message: "Profile Updated",
    })
    res.end()
}


// Multer
// exports.upload_new_profile = async (req,res)=>{
//     await User.updateOne({
//         _id: req.user._id
//     },{
//         profile:req.uploadedFilename
//     })

//     res.end()
// }