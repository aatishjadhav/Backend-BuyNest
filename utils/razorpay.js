const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,     // Add these to your .env file
  key_secret: process.env.RAZORPAY_SECRET, // Never expose in frontend
});

module.exports = razorpay;
