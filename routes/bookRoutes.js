const router = require("express").Router()
const auth = require("../utils/auth.js")
const Book = require("../models/Book.js")

// TODO: CRUD Books

router.get("/",async function(_,res){
    try {
        const bookList = await Book.find()
        res.send(bookList)
    } catch (error) {
        res.send(error)
    }
    res.end()
})

router.get('/:bookTitle' ,async function(req, res){
    try {
        const bookTitle = req.params.bookTitle.split("-").join(" ")
        const book  = await Book.findOne({title: bookTitle})
        if(book){
            console.log("BOOK found")
            res.send(book)
        }
        else{
            res.status(404)
        }
    } catch (err) {
        res.send(err)
    }
    res.end()
})

router.post("/" , auth.verifyStore ,async function(req,res){
    try{
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            synopsis: req.body.synopsis,
            price: req.body.price,
            releasedYear: req.body.releasedYear
        })
        await book.save()
        res.sendStatus(201)
    }
    catch(err){
        console.log(err)
    }
    res.end()
})

router.put("/", async function(req, res){
    const updatedBook = await Book.updateOne({
        _id: req.body.id
    },{
        price: req.body.price
    })
    res.send(updatedBook)
    res.end()
})

router.delete("/", async function(req,res){
    const deletedBook = await Book.deleteOne({
        _id: req.body.id
    })
    res.send(deletedBook)
    res.end()
})

module.exports = router