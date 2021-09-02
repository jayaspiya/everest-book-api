const Book = require("../models/Book.js")
const cloudinary = require("../utils/cloudinary.js")
const slug = require("../utils/slug.js")
const {success, failure} = require("../utils/messageJson.js")

exports.get_all_books = async function(req,res){
    try {
        // Default: Decending Order [Newest to Oldest] 
        let sort = -1
        // Check if request query oldest has truthy value
        if(!!req.query.oldest){
            // Ascending Order [Oldest to Newest]
            sort = 1
        }
        const bookList = await Book.find().sort({addedDate: sort})
        res.json(success("Get All Books", bookList))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.get_book = async function(req, res){
    try {
        const _id = req.params.bookId
        const book = await Book.findById(_id)
        if(book){
            res.json(success("Book Found", [book]))
        }
        else{
            res.json(failure("Book Not Found"))
        }
    } catch (error) {
        console.log(error)
        res.json(failure())  
    }
    res.end()
}

exports.get_books_without_cover = async function(_,res){
    try {
        // Default Value of Book.cover.front
        const defaultCover = "https://res.cloudinary.com/zayazzp/image/upload/c_crop,g_east,h_400,w_250/v1629858102/no-cover_eh5nrb.png"
        const bookList = await Book.find({"cover.front": defaultCover})
        res.json(success("Successful", bookList))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.insert_new_book = async function(req,res){
    try {
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
        res.json(success(`${req.body.title} Book Added.`))
    } catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.update_book_detail = async function(req, res){
    try {
        await Book.updateOne({
            _id: req.body._id
        },{
            tags: req.body.tags,
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            synopsis: req.body.synopsis,
            price: req.body.price,
            releasedYear: req.body.releasedYear
        })
        res.json(success("Book Updated"))
    } 
    catch (error) {
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.delete_book = async function(req,res){
    try{
        await Book.deleteOne({
            _id: req.params.id
        })
        res.json(success())
    }
    catch(error){
        console.log(error)
        res.json(failure())
    }
    res.end()
}

exports.update_cover_image = async function(req,res){
    try {
        // TODO: Filter Book by Mimetype
        const formImage = req.files.cover
        console.log(formImage)
        const imagePath = formImage.tempFilePath
        const bookName = req.params.bookId
        const cover = await cloudinary.uploadBookCover(imagePath, bookName)
        const _id = req.params.bookId
        await Book.updateOne({_id},{cover})
        res.json(success("Book Cover Changed"))
    } catch (error) {
        conosle.log(error)
        res.json(failure())
    }
    res.end()
}
// Searching [Unused fo now] 
// TODO: Need To Change Searching
exports.get_book_by_title = async function(req, res){
    const bookTitle = slug(req.params.bookTitle).toLowerCase()
    const bookList = await Book.findOne({title: bookTitle})
    res.json({
        message: "Successful",
        success: true,
        data: [bookList]
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
        data: [bookList]
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
