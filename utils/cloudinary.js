const cloudinary = require("cloudinary").v2
const cloud_name = process.env.CLOUD_NAME
const api_secret = process.env.API_SECRET
const api_key = process.env.API_KEY

cloudinary.config({cloud_name, api_secret, api_key})

exports.uploadBookCover = async (imagePath, bookName)=>{
        const result = await cloudinary.uploader.upload(imagePath,{
            public_id: bookName + Date.now(),
            folder:"covers"
        })
        const imgUrl = result.secure_url
        const prefix= "https://res.cloudinary.com/zayazzp/image/upload/"
        const mainURL = imgUrl.replace(prefix, "")
        return {
            side: prefix +"c_crop,h_400,w_30/"+ mainURL,
            front: prefix +"c_crop,g_west,h_400,w_250/"+ mainURL,
            back: prefix +"c_crop,g_east,h_400,w_250/"+ mainURL
        }
}