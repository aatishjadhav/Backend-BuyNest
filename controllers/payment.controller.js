const razorpay = require("../utils/razorpay");
const crypto = require("crypto");

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body; 

    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

      const order = await razorpay.orders.create(options);

    res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};


const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    return res.status(200).json({
      message: "Payment verified",
      razorpay_order_id,
      razorpay_payment_id,
    });
  } else {
    return res.status(400).json({ error: "Invalid signature" });
  }
};




module.exports = { createRazorpayOrder, verifyPayment };
