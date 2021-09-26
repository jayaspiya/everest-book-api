const router = require("express").Router()
const auth = require("../middleware/auth.js")
const bookController = require("../controllers/bookController.js")

router.get("/", bookController.get_all_books)

router.get("/search/", bookController.search_book)

// [User Verification Check] 

router.get('/view/:bookId', auth.checkUserLoggedIn, bookController.get_book)

// [For Admin Interface] 

router.get("/books-without-cover", bookController.get_books_without_cover)

// [admin Verification Required] 

router.post("/", auth.verifyStore, bookController.insert_new_book)

router.patch("/cover/:bookId", auth.verifyStore, bookController.update_cover_image)

router.put("/", auth.verifyStore, bookController.update_book_detail)

router.delete("/:id", auth.verifyStore, bookController.delete_book)


module.exports = router