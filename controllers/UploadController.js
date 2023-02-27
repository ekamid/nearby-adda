const UploadModel = require("../models/Upload");
const apiResponse = require("../helpers/apiResponse");
/**
 * Upload File.
 *
 * @param {string}      name
 * @param {string}      type
 * @param {string}      src
 *
 * @returns {Object}
 */

const upload = async (req, res) => {
  55;
  try {
    const upload = new UploadModel({
      name: req.body.name,
      type: req.body.type,
      src: req.body.src,
    });

    const newUpload = await upload.save();

    if (!newUpload) {
      return apiResponse.notFoundResponse(res, "Something went wrong");
    }

    return apiResponse.successResponseWithData({
      res,
      message: "File Uploaded Successfully",
      newUpload,
    });
  } catch (err) {
    return apiResponse.ErrorResponse(res, err);
  }
};

const getUploadedFileById = async (req, res) => {
  const file = await UploadModel.findById(req.body.id);

  if (!file) {
    return apiResponse.notFoundResponse(res, "Uploaded file not found");
  }

  return apiResponse.successResponseWithData({
    res,
    message: "Uploaded file retrtieved",
    file,
  });
};

module.exports = {
  upload,
  getUploadedFileById,
};
