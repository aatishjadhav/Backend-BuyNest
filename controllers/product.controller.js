const Product = require("../models/product.models");

const getProducts = async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    res.status(200).json(getAllProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProductsByCategory = async (req, res) => {
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
};

const addProduct = async (req, res) => {
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
};

const updateProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
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
};

module.exports = {
  getProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
};
