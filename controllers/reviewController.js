const Review = require("../models/Review.js")
exports.get_all_reviews = async function(req,res){
    const reviews = await Review.find()
    res.send(reviews)
}

exports.insert_new_review = async function(req, res){
    const uId = req.user._id 
    const review = new Review({
        userId: uId,
        bookId: req.body.bookId,
        description: req.body.description
    })
    review.save()
    res.sendStatus(201)
}