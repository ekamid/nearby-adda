const RoleModel = require("../models/Role");

const createRole = async (req, res) => {
  try {
    // Create User object with escaped and trimmed data.

    let role = new RoleModel({
      name: req.body.code,
      username: req.body.name,
      email: req.body.description,
      password: req.body.status,
    });

    let roleExist = await RoleModel.findOne({ name: req.body.name });

    if (roleExist) {
      return apiResponse.ErrorResponse(res, "Role Exists");
    }

    // Save user in the database
    let newRole = await role.save();

    if (!newRole) {
      return apiResponse.ErrorResponse(res, "Something went wrong");
    }

    return apiResponse.successResponseWithData(
      res,
      "role created successfully",
      newRole
    );
  } catch (err) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, err);
  }
};

module.exports = {
  createRole,
};
