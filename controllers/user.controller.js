const User = require("../models/user.models");

const getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUsers };
