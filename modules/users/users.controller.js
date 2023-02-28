const apiResponse = require("../../helpers/apiResponse");
const { createJWToken } = require("../../helpers/jwt");
const UsersService = require("./users.service");

// const usersService = require

const createUser = async (req, res) => {
  try {
    const user = await UsersService.createUser(req.body);

    if (!user) {
      apiResponse.ErrorResponse(res, "Something went wrong");
    }

    apiResponse.successResponse(res, "User Created Successfully!");
  } catch (err) {
    apiResponse.ErrorResponse(res, err);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await UsersService.getUserByEmail(req.body.email);

    if (!user) {
      return apiResponse.unauthorizedResponse(res, "User not found");
    }

    let isMatch = user.comparePassword(req.body.password);

    if (!isMatch) {
      return apiResponse.unauthorizedResponse(res, "Invalid Password");
    }

    if (!user.verified) {
      return apiResponse.unauthorizedResponse(
        res,
        "Your account is not verified."
      );
    }

    let userData = {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    const data = createJWToken(userData);

    apiResponse.successResponseWithData(res, "User logged in successfully", {
      user: user,
      token: data.token,
    });
  } catch (err) {
    apiResponse.ErrorResponse(res, err);
  }
};

module.exports = {
  createUser,
  loginUser,
};
