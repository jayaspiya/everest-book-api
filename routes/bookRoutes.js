const router = require("express").Router()
const auth = require("../middleware/auth.js")
const bookController = require("../controllers/bookController.js")

router.get("/", bookController.get_all_books)

router.get('/view/:bookId', auth.checkUserLoggedIn, bookController.get_book)

// [For Admin Interface] 

router.get("/books-without-cover", bookController.get_books_without_cover)

// [User Verification Required] 
router.post("/", auth.verifyStore, bookController.insert_new_book)

router.patch("/cover/:bookId", auth.verifyStore, bookController.update_cover_image)

router.put("/", auth.verifyStore, bookController.update_book_detail)

router.delete("/:id", auth.verifyStore, bookController.delete_book)

// Searching  Unused for now

router.get("/search/", bookController.search_book)

router.get("/author/:authorName", bookController.get_book_by_author)

router.get("/isbn/:isbn", bookController.get_book_by_isbn)

router.get('/tags', bookController.get_book_by_tags)

router.get('/title/:bookId', bookController.get_book_by_title)

module.exports = router