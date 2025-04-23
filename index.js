const { initializeDb } = require("./db/db.connect");
const Product = require("./models/product.models");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/user.models");
const Order = require("./models/order.models");
const { verifyToken } = require("./middleware/verifyToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


initializeDb();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

app.get("/products", verifyToken, async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    res.status(200).json(getAllProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users", verifyToken, async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });
    // Remove sensitive fields like password before sending
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({ message: "User already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "user registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
});

app.get("/products/categories/:category", verifyToken, async (req, res) => {
  try {
    const category = req.params.category;
    const getProdByCategory = await Product.find({ category: category });
    if (getProdByCategory) {
      res.status(200).json(getProdByCategory);
    } else {
      res.status(404).json({ error: "Category not found", error });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/products", verifyToken, async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      imgUrl,
      rating,
      reviews,
      price,
      originalPrice,
      discount,
      quantity,
      size,
      refundPolicy,
      paymentOptions,
    } = req.body;
    const addNew = new Product({
      name,
      description,
      category,
      imgUrl,
      rating,
      reviews,
      price,
      originalPrice,
      discount,
      quantity,
      size,
      refundPolicy,
      paymentOptions,
      createdBy: req.user._id,
    });
    await addNew.save();
    res
      .status(201)
      .json({ message: "new product added successfully", product: addNew });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/products/:productId", verifyToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const dataToUpdate = req.body;
    const updatedData = await Product.findByIdAndUpdate(
      productId,
      dataToUpdate,
      { new: true }
    );
    if (updatedData) {
      res.status(200).json({
        message: "product updated successfully",
        product: updatedData,
      });
    } else {
      res.status(404).json({ error: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/products/:productId", verifyToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ error: "product not found" });
    } else {
      res.status(200).json(deletedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/orders", verifyToken, async (req, res) => {
  try {
    
    const { items, total } = req.body;
    const userId = req.user.id; 

    const order = new Order({
      items,
      total,
      user: userId,
    });
    console.log("Order to be saved:", order);

    await order.save();
    console.log("Order saved successfully!");

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/orders", verifyToken, async (req, res) => {
  try {   
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).populate(
      "items.productId"
    ).populate("user", "username");

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
