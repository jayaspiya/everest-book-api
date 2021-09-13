const router = require("express").Router()
const auth = require("../middleware/auth.js")
const orderController = require("../controllers/orderController.js")

router.get("/", auth.verifyStore,orderController.get_order)

router.post("/", auth.verifyUser, orderController.add_order)

router.put("/complete/:id", auth.verifyUser, orderController.complete_order)

router.put("/cancel/:id", auth.verifyUser, orderController.cancel_order)

module.exports = router