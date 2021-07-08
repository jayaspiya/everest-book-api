const router = require("express").Router()
const auth = require("../middleware/auth.js")
const bookController = require("../controllers/bookController.js")

router.get("/", bookController.get_all_books)

router.get('/:bookTitle', bookController.get_book_by_title)

// [User Verification Required] 
router.post("/", auth.verifyStore, bookController.insert_new_book)

router.put("/", auth.verifyStore, bookController.update_book_detail)

router.delete("/", auth.verifyStore, bookController.delete_book_by_id)

module.exports = router