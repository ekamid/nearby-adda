const UserModel = require("../../models/User");

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

module.exports = {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById,
};
