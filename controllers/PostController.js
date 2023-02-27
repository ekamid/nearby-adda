const GeneralPost = require("../models/Post/GeneralPost");
//helper file to prepare responses.
const apiResponse = require("../helpers/apiResponse");

//services

const createGeneralPost = async (req, res) => {
  try {
    // Create User object with escaped and trimmed data.
    let post = new GeneralPost({
      description: req.body.description,
      image: req.body.image,
    });

    // Save user in the database
    let newPost = await post.save();
    if (!newPost) {
      return apiResponse.ErrorResponse(res, "Something went wrong");
    }
    return apiResponse.successResponseWithData(
      res,
      "Post created successfully",
      newPost
    );
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

module.exports = {
  createGeneralPost,
};
