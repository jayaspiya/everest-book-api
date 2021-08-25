const router = require("express").Router()
const auth = require("../middleware/auth.js")
const bookController = require("../controllers/bookController.js")

router.get("/", bookController.get_all_books)

router.get('/view/:bookId', bookController.get_book)

router.get("/latest", bookController.get_latest_books)

router.get("/author/:authorName", bookController.get_book_by_author)

router.get("/isbn/:isbn", bookController.get_book_by_isbn)

router.get('/tags', bookController.get_book_by_tags)

router.get('/title/:bookId', bookController.get_book_by_title)

// [User Verification Required] 
// router.post("/", auth.verifyStore, bookController.insert_new_book)
router.post("/", bookController.insert_new_book)


router.put("/cover/:bookId", auth.verifyStore, bookController.update_cover_image)

router.put("/", auth.verifyStore, bookController.update_book_detail)

router.delete("/", auth.verifyStore, bookController.delete_book_by_id)

module.exports = router