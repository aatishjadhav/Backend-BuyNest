const Order = require("../models/order.models");

const placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    console.log("User ID from token:", req.user.userId);
    const order = new Order({
      items,
      total,
      user: req.user.userId,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate("items.productId")
      .populate("user", "name email");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

module.exports = { placeOrder, getOrders };
