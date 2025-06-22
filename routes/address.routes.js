const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");

const {
  getAddress,
  addNewAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address.controller");

router.get("/", getAddress);
router.post("/", verifyToken, addNewAddress);
router.put("/:addressId", verifyToken, updateAddress);
router.delete("/:addressId", verifyToken, deleteAddress);

module.exports = router;
