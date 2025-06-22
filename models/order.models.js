const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  total: Number,
  appliedCoupon: { type: String, default: null },
  discount: { type: Number, default: 0 },
  address: {
    fullName: String,
    streetAddress: String,
    apartment: String,
    city: String,
    country: String,
    postalCode: String,
    phoneNumber: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
