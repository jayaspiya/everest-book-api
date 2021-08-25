const mongoose = require('mongoose')
const capitalize = require("../utils/capitalize.js")
const opts = {
    toJSON: {
        getters: true
    }
}
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true
    },
    synopsis:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    releasedYear:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        default: 0
    },
    addedDate:{
        // To filter latest books
        type: Date,
        default: Date.now,
        select: false
    },
    tags:[
        {
            type: String
        }
    ],
    cover:{
        side:{
            type: String,
            default: "https://res.cloudinary.com/zayazzp/image/upload/c_crop,h_400,w_30/v1629858102/no-cover_eh5nrb.png"
        },
        front: {
            type: String,
            default: "https://res.cloudinary.com/zayazzp/image/upload/c_crop,g_east,h_400,w_250/v1629858102/no-cover_eh5nrb.png"
        },
        back: {
            type: String,
            default: "https://res.cloudinary.com/zayazzp/image/upload/c_crop,g_west,h_400,w_250/v1629858102/no-cover_eh5nrb.png"
        }
    }
},opts)
bookSchema.path("title").get(v=>{
    return capitalize(v)
})
bookSchema.path("title").set(v=>{
    return v.toLowerCase()
})
bookSchema.path("author").get(v=>{
    return capitalize(v)
})
bookSchema.path("author").set(v=>{
    return v.toLowerCase()
})

module.exports = mongoose.model("Book", bookSchema)