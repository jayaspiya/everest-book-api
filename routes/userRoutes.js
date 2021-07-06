const router = require('express').Router()
const auth = require("../utils/auth.js")
const userController = require("../controllers/userController.js")

router.post("/register", userController.register_new_user)

router.post("/login", userController.login_user)

// [User Verification Required] 
router.get("/profile", auth.verifyUser, userController.get_user_detail)

router.put('/', auth.verifyUser, userController.update_user_detail)

module.exports = router