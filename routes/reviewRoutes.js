const router = require("express").Router()
const auth = require("../middleware/auth.js")
const reviewController = require("../controllers/reviewController.js")
router.get('/', reviewController.get_all_reviews)
router.post("/", auth.verifyUser, reviewController.insert_new_review)
module.exports = router
