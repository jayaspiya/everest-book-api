const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
    },
    password:{
        type: String,
        required: true,
    },
    passwordSetDate:{
        // For Password Change Option
        type: Date,
        default: Date.now,
        select: false
    },
    joinedDate:{
        type: Date,
        default: Date.now,
        select: false
    },
    firstname:{
        type: String,
        default:""
    },
    lastname:{
        type:String,
        default:""
    },
    address:{
        type: String,
        default:""
    },
    phone: {
        type: String,
        default:""
    },
    profile:{
        type: String
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'other'],
        default: "other"
    },
    DOB: {
        type: String
    },
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ],
    recentlyViewed:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
})

userSchema.path("firstname").get(v=>{
    return capitalize(v)
})
userSchema.path("firstname").set(v=>{
    return v.toLowerCase()
})
userSchema.path("lastname").get(v=>{
    return capitalize(v)
})
userSchema.path("lastname").set(v=>{
    return v.toLowerCase()
})

userSchema.methods.addToCart = async function(itemId){
    const updatedCart = [...this.cart]
    const itemIndex = updatedCart.findIndex(
        item => {
            return (item.toString() === itemId)
        }
    )
    if(itemIndex === -1){
        updatedCart.push(itemId)
        this.cart = updatedCart
        await this.save()
        return true
    }
    return false
}

userSchema.methods.deleteFromCart = async function(itemId){
    const updatedCart = [...this.cart]
    const itemIndex = updatedCart.findIndex(
        item => {
            return (item.toString() === itemId)
        }
    )
    if(itemIndex !== -1){
        updatedCart.splice(itemIndex,1)
        this.cart = updatedCart
        await this.save()
        return true
    }
    return false
}

module.exports = mongoose.model('User',userSchema)