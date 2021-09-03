const router = require("express").Router()
const storeController = require("../controllers/storeController.js")

router.post('/register', storeController.register_new_store)

router.post('/login', storeController.login_store)

module.exports = router