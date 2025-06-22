const Address = require("../models/address.models");

const getAddress = async (req, res) => {
  try {
    const getAllAddresses = await Address.find();
    res.status(200).json(getAllAddresses);
  } catch (error) {
    console.error("Error while getting addresses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addNewAddress = async (req, res) => {
  const {
    fullName,
    streetAddress,
    apartment,
    city,
    country,
    postalCode,
    phoneNumber,
    isSelected,
  } = req.body;

  try {
    const addAddress = new Address({
      fullName,
      streetAddress,
      apartment,
      city,
      country,
      postalCode,
      phoneNumber,
      isSelected,
    });
    await addAddress.save();
    res
      .status(200)
      .json({ message: "New Address Added ", address: addAddress });
  } catch (error) {
    console.error("Error while adding address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAddress = async (req, res) => {
  const addressId = req.params.id;
  const dataToUpdate = req.body;
  try {
    const updatedAddress = await findByIdAndUpdate(addressId, dataToUpdate, {
      new: true,
    });
    if (!updateAddress) {
      return res
        .status(404)
        .json({ message: "Address not found", address: addressId });
    } else {
      return res.status(200).json({
        message: "Address updated successfully",
        address: updatedAddress,
      });
    }
  } catch (error) {
    console.error("Error while updating address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAddress = async (req, res) => {
  const addressId = req.params.id;
  try {
    const deletedAddress = await findByIdAndDelete(addressId);
    if (!deleteAddress) {
      return res.status(404).json({ message: "address not found" });
    } else {
      return res.status(200).json({
        message: "address deleted successfully",
        address: deletedAddress,
      });
    }
  } catch (error) {
    console.error("Error while deleting address:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAddress, addNewAddress, updateAddress, deleteAddress };
