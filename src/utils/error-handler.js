const {
  notFoundResponse,
  unauthorizedResponse,
} = require("../helpers/apiResponse");

module.exports = (app) => {
  // throw 404 if URL not found
  app.all("*", function (req, res) {
    return notFoundResponse(res, "Page not found");
  });

  //unauthorized response
  app.use((err, req, res) => {
    if (err.name == "UnauthorizedError") {
      return unauthorizedResponse(res, err.message);
    }
  });
};
