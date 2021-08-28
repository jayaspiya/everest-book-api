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
    },
    birthdate:{
        type: Date
    },
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
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

module.exports = mongoose.model('User',userSchema)