const razorpay = require("../utils/razorpay");
const crypto = require("crypto");
const Order = require("../models/order.models");

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    const options = {
      amount: amount * 100, // convert to paise
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

// const verifyPayment = async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     cart,
//     total,
//     userId,
//     appliedCoupon,
//     discount
//   } = req.body;

//   const generatedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(razorpay_order_id + "|" + razorpay_payment_id)
//     .digest("hex");

//   if (generatedSignature === razorpay_signature) {
//     const order = new Order({
//       razorpay_order_id,
//       razorpay_payment_id,
//       items: cart,
//       total,
//       discount,
//       appliedCoupon,
//       user: userId,
//       paymentStatus: "Paid",
//     });

//     await order.save();

//     res.status(201).json({ message: "Payment verified & order placed", order });
//   } else {
//     res.status(400).json({ error: "Invalid signature" });
//   }
// };

// const verifyPayment = async (req, res) => {
//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     cart,
//     total,
//     userId,
//     appliedCoupon,
//     discount,
//     address,
//   } = req.body;

//   const generatedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_SECRET)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest("hex");

//   if (generatedSignature !== razorpay_signature) {
//     return res.status(400).json({ error: "Invalid signature" });
//   }

//   try {
//     const orderItems = cart.map((item) => ({
//       product: item.productId || item._id,
//       quantity: item.quantity,
//       price: item.price,
//     }));

//     const order = new Order({
//       razorpay_order_id,
//       razorpay_payment_id,
//       items: orderItems,
//       total,
//       discount,
//       appliedCoupon,
//       user: userId,
//       address,
//       paymentStatus: "Paid",
//       paymentDetails: {
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       },
//     });

//     await order.save();

//     res.status(201).json({
//       message: "Payment verified & order placed",
//       order,
//     });
//   } catch (error) {
//     console.error("Error saving verified order:", error);
//     res.status(500).json({ error: "Failed to place order after verification" });
//   }
// };


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
