const express = require("express");
const router = express.Router();
const { createRazorpayOrder, verifyPayment } = require("../controllers/payment.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/create-order", createRazorpayOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;