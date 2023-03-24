const apiResponse = require("../../helpers/apiResponse");
const { createJWToken } = require("../../helpers/jwt");
const UsersService = require("./users.service");

const createUser = async (req, res) => {
  try {
    const user = await UsersService.createUser(req.body);

    if (!user) {
      return apiResponse.ErrorResponse(res, "Something went wrong");
    }

    return apiResponse.successResponse(res, "User Created Successfully!");
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
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
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    const data = createJWToken(userData);

    return apiResponse.successResponseWithData(
      res,
      "User logged in successfully",
      {
        token: data.token,
      }
    );
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

const getAuthenticatedUser = async (req, res) => {
  const { user, redisClient } = req;
  try {
    const authenticatedUser = await UsersService.getUserById(user.id);

    if (!authenticatedUser) {
      return apiResponse.notFoundResponse(res, "User not found");
    }

    //store user information in cache
    redisClient.setEx(user.id, 280000, JSON.stringify(authenticatedUser));
    await redisClient.quit();
    return apiResponse.successResponseWithData(
      res,
      "Logged in user data retrived successfully",
      {
        user: authenticatedUser,
      }
    );
  } catch (err) {
    console.error(err);
    return apiResponse.ErrorResponse(res, err);
  }
};

const updateUserAddress = async (req, res) => {
  const { user, body } = req;
  try {
    const updatedUser = await UsersService.updateUserAddress(user.id, body);

    if (!updatedUser.address) {
      return apiResponse.ErrorResponse(res, "Something went wrong");
    }

    return apiResponse.successResponse(
      res,
      "Uesr address updated successfully"
    );
  } catch (err) {
    console.log(err);
    return apiResponse.ErrorResponse(res, err);
  }
};

module.exports = {
  createUser,
  loginUser,
  getAuthenticatedUser,
  updateUserAddress,
};
