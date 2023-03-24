const apiResponse = require("../helpers/apiResponse");
const userCache = async (req, res, next) => {
  const { user, redisClient } = req;

  try {
    //get and check if the user data exists in the cache, if not go next
    //or return the user
    await redisClient.connect();
    const response = await redisClient.get(user.id);
    if (response === null) {
      next();
    } else {
      const data = JSON.parse(response);
      await redisClient.quit();
      return apiResponse.successResponseWithData(
        res,
        "Logged in user data retrived successfully",
        {
          user: data,
        }
      );
    }
  } catch (err) {
    console.log("----err----");
    console.log(err);
    return apiResponse.ErrorResponse(res, "Something went wrong!");
  }
};

module.exports = {
  userCache,
};
