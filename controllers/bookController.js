const Book = require("../models/Book.js")
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
        const bookTitle = req.params.bookTitle.split("-").join(" ")
        const book  = await Book.findOne({title: bookTitle})
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

exports.insert_new_book = async function(req,res){
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