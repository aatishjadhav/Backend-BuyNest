const { initializeDb } = require("./db/db.connect");
const Product = require("./models/product.models");
const express = require("express");
const cors = require("cors");
const User = require("./models/user.models");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

initializeDb();

const PORT = process.env.PORT || 4000;

app.get("/products", async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    res.status(200).json(getAllProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exist" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
     res
      .status(201)
      .json({ message: "New user added successfully", user: newUser });
  } catch (error) {
     res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    res.json({ 
      message: "Login Successful", 
      user: user
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get("/products/categories/:category", async (req, res) => {
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

app.post("/products", async (req, res) => {
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
    });
    await addNew.save();
    res
      .status(201)
      .json({ message: "new product added successfully", product: addNew });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/products/:productId", async (req, res) => {
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

app.delete("/products/:productId", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
