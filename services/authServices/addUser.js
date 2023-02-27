const User = require("../../models/User");

exports.addUser = async (userData) => {
  try {
    let user = new User(userData);
    let newUser = await user.save();
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};
