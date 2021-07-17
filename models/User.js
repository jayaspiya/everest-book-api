const mongoose = require('mongoose')
const { update } = require('./Store')
// TODO: saved items, migrate controller to methods
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
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book"
            },
            quantity:{
                type: Number,
                default: 1
            }
        }
    ]
})

userSchema.methods.addToCart = function(itemId){
    const updatedCart = [...this.cart]
    const itemIndex = updatedCart.findIndex(
        item => {
            return (item.itemId.toString() === itemId)
        }
    )
    if(itemIndex === -1){
        updatedCart.push({ itemId,quantity:1 })
        this.cart = updatedCart
    }
    else{
        updatedCart[itemIndex].quantity++
    }
    return this.save()
}



module.exports = mongoose.model('User',userSchema)