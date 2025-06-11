const User = require("../models/user.models");

const getUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    res.status(200).json(getAllUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getUsers };
