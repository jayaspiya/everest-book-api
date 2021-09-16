const router = require("express").Router()
const auth = require("../middleware/auth.js")
const orderController = require("../controllers/orderController.js")

router.get("/", auth.verifyStore,orderController.get_order)

router.post("/", auth.verifyUser, orderController.add_order)

router.get("/user", auth.verifyUser, orderController.get_order_by_user)

router.put("/complete/:id", auth.verifyStore, orderController.complete_order)

router.put("/cancel/:id", auth.verifyStore, orderController.cancel_order)

module.exports = router