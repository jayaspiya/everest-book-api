const Review = require("../models/Review.js")
exports.get_all_reviews = async function(req,res){
    const reviews = await Review.find()
    res.json({
        message: "Review Retrieved successful.",
        success: true,
        data: reviews
    })
}

exports.get_review_by_book_id = async function(req,res){
    const bookReviews = await Review.find({book: req.params.bookId}).populate({
        path:'user',
        select: 'firstname _id'
    }).select("-book")
    res.json({
        message: "Review Retrieved successful.",
        success: true,
        data: bookReviews
    })
}

exports.insert_new_review = async function(req, res){
    const _id = req.user._id 
    const review = new Review({
        user: _id,
        book: req.body.book,
        description: req.body.description,
        rating: req.body.rating
    })
    review.save()
    res.json({
        message: "Review Inserted.",
        success: true,
    })
    res.end()
}