const router = require("express").Router()
const storeController = require("../controllers/storeController.js")
const auth = require("../utils/auth.js")

router.post('/register', storeController.register_new_store)

router.post('/login', storeController.login_store)

// [Store Verification Required] 
router.get("/profile",auth.verifyStore, storeController.get_store_detail)

module.exports = router