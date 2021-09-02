const router = require('express').Router()
const auth = require("../middleware/auth.js")
const userController = require("../controllers/userController.js")

router.post("/register", userController.register_new_user)

router.post("/login", userController.login_user)

// [User Verification Required] 

router.get("/profile", auth.verifyUser, userController.get_user_detail)

router.get("/cart", auth.verifyUser, userController.get_cart)

router.post("/addtocart/:bookId", auth.verifyUser, userController.add_to_cart)

router.put('/', auth.verifyUser, userController.update_user_detail)

router.patch("/profile", auth.verifyUser, userController.update_profile_picture)

module.exports = router