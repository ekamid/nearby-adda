const UserModel = require("../../models/User");

const createUser = async (userData) => {
  return await UserModel.create(userData);
};

const getUserByEmail = async (email) => {
  return UserModel.findOne({ email }).select("-password");
};

const getUserByUsername = async (username) => {
  return UserModel.findOne({ username }).select("-password");
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByUsername,
};
