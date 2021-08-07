const router = require('express').Router()
const auth = require("../middleware/auth.js")
const userController = require("../controllers/userController.js")
const upload = require("../middleware/upload.js")

router.post("/register", userController.register_new_user)

router.post("/login", userController.login_user)

// [User Verification Required] 
router.post("/upload", auth.verifyUser, upload.single("profile"),userController.upload_new_profile)

router.get("/profile", auth.verifyUser, userController.get_user_detail)

router.put('/', auth.verifyUser, userController.update_user_detail)

router.get("/cart", auth.verifyUser, userController.get_cart)

router.post("/addtocart", auth.verifyUser, userController.add_to_cart)

router.put("/update-profile", auth.verifyUser, userController.update_profile_picture)

module.exports = router