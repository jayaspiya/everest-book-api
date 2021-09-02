const bcrypt = require("bcryptjs")
const User = require("../models/User.js")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary.js")
const {success, failure} = require("../utils/messageJson.js")
const tokenKey = process.env.TOKEN_KEY

exports.register_new_user = async function (req, res) {
	try {
		const checkUser = await User.findOne({email: req.body.email})
		if (checkUser) {
            res.json(failure("Email already exist"))
		}
        else {
			const {firstname, lastname, password, address, email, phone } = req.body
			const salt = await bcrypt.genSalt(10)
			const hashed = await bcrypt.hash(password, salt)
			// User Avatar API
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
			res.json(success("Registeration successful."))
		}
	} 
    catch (error) {
		console.log(error)
		res.json(failure())
	}
	res.end()
}

exports.login_user = async function (req, res) {
	try {
		const user = await User.findOne({email: req.body.email})
		if (user) {
			const validLogin = await bcrypt.compare(req.body.password, user.password)
			if (validLogin) {
                const _id = user._id
				const accessToken = jwt.sign({_id}, tokenKey)
				res.json({
                    message: "Login successful.", 
                    accessToken, 
                    success: true
                })
			} else {
                // Incorrect Password
                res.json(failure("Invalid Credential"))
			}
		} else {
            // Incorrect Email
			res.json(failure("Invalid Credential"))
		}
	} catch (error) {
		console.log(error)
		res.json(failure())
	}
	res.end()
}

exports.get_user_detail = async (req, res)=>{
    try {
        // Remove password and Cart from User
        const user = await User.findOne({_id: req.user._id}).select("-password -cart")
        res.json(success("Request successful", user))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.update_user_detail = async (req, res)=>{
    try {
        await User.updateOne({_id: req.user._id},{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            address: req.body.address,
            phone: req.body.phone,
            gender: req.body.gender,
            birthdate: req.body.birthdate
        })
        res.json(success("User Updated"))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.add_to_cart = async (req,res) =>{
    try{
        const _id = req.user._id
        const user = await User.findById(_id)
        const isAdded = await user.addToCart(req.params.bookId)
        if(isAdded){
            res.json(success("New Book Added"))
        }
        else{
            res.json(failure("Book Already On Cart"))
        }
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.get_cart = async (req,res) => {
    try{
        const _id = req.user._id
        const user = await User.findOne(_id).populate({path: "cart"})
        res.json(success("Request Successful", user.cart))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.update_profile_picture = async function(req,res){
    try{
        const formImage = req.files.profile
        const imagePath = formImage.tempFilePath
        const _id = req.user._id
        const profile = await cloudinary.uploadUserProfile(imagePath, _id)
        await User.updateOne({_id},{profile})
        res.json(success("Profile Picture Changed"))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}