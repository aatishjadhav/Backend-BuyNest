const express = require("express");
const router = express.Router();
const { placeOrder, getOrders } = require("../controllers/order.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/", verifyToken, placeOrder);
router.get("/", verifyToken, getOrders);

module.exports = router;
