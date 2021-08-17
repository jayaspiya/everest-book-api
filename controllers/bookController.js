const Book = require("../models/Book.js")
const cloudinary = require("../utils/cloudinary.js")
const slug = require("../utils/slug.js")
exports.get_all_books = async function(_,res){
    try {
        const bookList = await Book.find()
        res.send(bookList)
    } catch (error) {
        res.send(error)
    }
    res.end()
}

exports.get_book_by_title = async function(req, res){
    try {
        const bookTitle = slug(req.params.bookTitle).toLowerCase()
        const book = await Book.findOne({title: bookTitle})
        if(book){
            res.send(book)
        }
        else{
            res.status(404)
        }
    } catch (err) {
        res.send(err)
    }
    res.end()
}

exports.get_book_by_author = async function(req,res){
    try{
        const authorName = slug(req.params.authorName).toLowerCase()
        const bookList = await Book.find({author: authorName})
        if(bookList.length>0){
            res.send(bookList)
        }
        else{
            res.status(404)
        }
    }
    catch(err){
        res.send(err)
    }
}
exports.get_book_by_isbn = async function(req,res){
    try {
        const isbn = req.params.isbn
        const book = await Book.findOne({isbn})
        if(book){
            res.send(book)
        }
        else{
            res.sendStatus(404)
        }
    } catch (error) {
        res.send(error)
    }
}

exports.get_book_by_tags = async function (req,res){
    const tags = req.body.tags
    const bookList = await Book.find({
        tags: {
            $all: tags
        }
    })
    res.send(bookList)
    res.end()
}

exports.get_latest_books = async function(req,res){
    try {
        const bookList = await Book.find().sort({addedDate: -1}).limit(2)
        res.send(bookList)
    } catch (error) {
        res.send(error)
    }
}

exports.insert_new_book = async function(req,res){
    try{
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            synopsis: req.body.synopsis,
            tags: req.body.tags,
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
}

exports.update_book_detail = async function(req, res){
    const updatedBook = await Book.updateOne({
        _id: req.body._id
    },{
        quantity: req.body.quantity,
        tags: req.body.tags,
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        synopsis: req.body.synopsis,
        price: req.body.price,
        releasedYear: req.body.releasedYear
    })
    res.end()
}

exports.delete_book_by_id = async function(req,res){
    await Book.deleteOne({
        _id: req.body._id
    })
    res.end()
}

exports.update_cover_image = async function(req,res){
    const formImage = req.files.bookFullCover
    const imagePath = formImage.tempFilePath
    const bookName = req.params.bookId
    const result = await cloudinary.uploadBookCover(imagePath, bookName)
    const bookId = req.params.bookId
    await Book.updateOne({
        _id: bookId
    },{
        cover: result
    })
    res.end()
}