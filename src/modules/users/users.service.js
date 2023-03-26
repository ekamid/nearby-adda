const UserModel = require("../../database/models/User");

const createUser = async (userData) => {
  return await UserModel.create(userData);
};

const getUserById = async (id) => {
  return UserModel.findById(id).select("-password");
};

const getUserByEmail = async (email) => {
  return UserModel.findOne({ email });
};

const getUserByUsername = async (username) => {
  return UserModel.findOne({ username }).select("-password");
};

const updateUserAddress = async (userId, data) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: { ...data },
    },
    { new: true }
  );
  return updatedUser;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
  updateUserAddress,
};
