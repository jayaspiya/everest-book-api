const router = require("express").Router()
const auth = require("../middleware/auth.js")
const reviewController = require("../controllers/reviewController.js")

router.get("/:bookId", reviewController.get_review_by_book_id)

// [User Verification Required] 

router.post("/:bookId", auth.verifyUser, reviewController.insert_new_review)

router.put("/:reviewId", auth.verifyUser, reviewController.update_review)

router.delete("/:reviewId", auth.verifyUser, reviewController.delete_review)


module.exports = router
