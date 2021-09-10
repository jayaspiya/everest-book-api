const router = require("express").Router()
const auth = require("../middleware/auth.js")
const orderController = require("../controllers/orderController.js")

router.get("/", auth.verifyStore,orderController.get_order)

router.post("/", auth.verifyUser, orderController.add_order)

module.exports = router