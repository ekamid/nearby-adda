const express = require("express");
const cors = require("cors");
const { homeRouter, eventsRouter, usersRouter } = require("./routes");
const handleErrors = require("./utils/error-handler");
const handleStaticFilesRequests = require("./utils/static-file-request-handler");

module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  //api
  app.use("/", homeRouter);
  app.use("/v1/users", usersRouter);
  app.use("/v1/events", eventsRouter);

  //static file request handlers
  handleStaticFilesRequests(app);

  // error handling
  handleErrors(app);
};
