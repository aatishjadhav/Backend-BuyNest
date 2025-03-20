const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Men's", "Women's", "Kids", "Electronics"], 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  size: [
    {
      type: String,
      enum: ["S", "M", "XL", "XXL"],
    },
  ],

  refundPolicy: {
    type: String,
    default: "10 days Refundable",
  },
  paymentOptions: {
    payOnDelivery: {
      type: Boolean,
      default: true,
    },
    freeDelivery: {
      type: Boolean,
      default: true,
    },
    securePayment: {
      type: Boolean,
      default: true,
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
