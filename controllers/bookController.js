const Book = require("../models/Book.js")
const cloudinary = require("../utils/cloudinary.js")
const slug = require("../utils/slug.js")

exports.get_all_books = async function(_,res){
    const bookList = await Book.find()
    res.json({
        message: "Get all book",
        success: true,
        data: bookList
    })
    res.end()
}

exports.get_book = async function(req, res){
    try {
        const book = await Book.findById(req.params.bookId)
        if(book){
            res.json({
                message: "Book found",
                success: true,
                data: [book]
            })
        }
        else{
            res.json({
                message: "Book not found",
                success: false,
            })
        }
    } catch (error) {
        res.json({
            message: "Id not valid",
            success: false
        })    
    }
    res.end()
}

exports.get_book_by_title = async function(req, res){
    const bookTitle = slug(req.params.bookTitle).toLowerCase()
    const bookList = await Book.findOne({title: bookTitle})
    res.json({
        message: "Successful",
        success: true,
        data: bookList
    })
    res.end()
}

exports.get_book_by_author = async function(req,res){
    const authorName = slug(req.params.authorName).toLowerCase()
    const bookList = await Book.find({author: authorName})
    res.json({
        message: "Successful",
        success: true,
        data: bookList
    })
    res.end()
}
exports.get_book_by_isbn = async function(req,res){
    const isbn = req.params.isbn
    const bookList = await Book.findOne({isbn})
    res.json({
        message: "Successful",
        success: true,
        data: bookList
    })
    res.end()
}

exports.get_book_by_tags = async function (req,res){
    const tags = req.body.tags
    const bookList = await Book.find({tags: {$all: tags}})
    res.json({
        message: "Successful",
        success: true,
        data: bookList
    })
    res.end()
}

exports.get_latest_books = async function(req,res){
    const bookList = await Book.find().sort({addedDate: -1})
    res.json({
        message: "Successful",
        success: true,
        data: bookList
    })
    res.end()
}

exports.insert_new_book = async function(req,res){
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
    res.json({
        message: `${req.body.title} Book Added.`,
        success: true,
    })
    res.end()
}

exports.update_book_detail = async function(req, res){
    await Book.updateOne({
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
    res.json({
        message: "Book Updated.",
        success: true,
    })
    res.end()
}

exports.delete_book_by_id = async function(req,res){
    await Book.deleteOne({
        _id: req.body._id
    })
    res.json({
        message: "Book Deleted.",
        success: true,
    })
    res.end()
}

exports.update_cover_image = async function(req,res){
    // Cover filename
    // TODO: Filter Book by Mimetype
    const formImage = req.files.cover
    console.log(formImage)
    const imagePath = formImage.tempFilePath
    const bookName = req.params.bookId
    const result = await cloudinary.uploadBookCover(imagePath, bookName)
    const bookId = req.params.bookId
    await Book.updateOne({
        _id: bookId
    },{
        cover: result
    })
    res.json({
        message: "Book Cover Updated.",
        success: true,
    })
    res.end()
}