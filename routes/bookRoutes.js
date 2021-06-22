const express = require("express")
const router = express.Router()

const Book = require("../models/bookModel.js")

router.get("/",async function(req,res){
    const bookList = await Book.find()
    res.send(bookList)
    res.end()
})

router.post("/",async function(req,res){
    try{
        const book = new Book({
            title:req.body.title,
            author:req.body.author,
            isbn: req.body.isbn,
            synopsis:req.body.synopsis,
            price:req.body.price
        })
        await book.save()
    }
    catch(err){
        console.log(err)
    }
    res.end()
})

module.exports = router