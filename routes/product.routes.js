const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/", getProducts);
router.get("/categories/:category", getProductsByCategory);
router.post("/", verifyToken, addProduct);
router.put("/:productId", verifyToken, updateProduct);
router.delete("/:productId", verifyToken, deleteProduct);

module.exports = router;
