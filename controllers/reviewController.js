const Review = require("../models/Review.js")
const {success, failure} = require("../utils/messageJson.js")

exports.get_review_by_book_id = async function(req,res){
    try{
        const bookReviews = await Review.find({book: req.params.bookId}).populate({
            path:'user',
            select: 'firstname _id profile'
        }).select("-book")
        res.json(success("Reviews Successful", bookReviews))
    }
    catch(e){
        console.log(e)
        res.json(failure())
    }
    res.end()
}

exports.insert_new_review = async function(req, res){
    try{
        const _id = req.user._id 
        const review = new Review({
            user: _id,
            book: req.params.bookId,
            description: req.body.description,
            rating: req.body.rating
        })
        review.save()
        res.json(success("New Review Added"))
    }
    catch(e){
        console.log(e)
        res.json(failure())
    }
    res.end()
}

exports.update_review = async function(req, res){
    try{
        await Review.updateOne({_id: req.params.reviewId, user: req.user._id},{
            description: req.body.description,
            rating: req.body.rating
        })
        res.json(success("Review Updated"))
    }
    catch(e){
        console.log(e)
        res.json(failure())
    }
    res.end()
}

exports.delete_review = async function(req,res){
    try{
        await Review.deleteOne({_id: req.params.reviewId, user: req.user._id})
        res.json(success("Review Deleted"))
    }
    catch(e){
        console.log(e)
        res.json(failure())
    }
    res.end()
}