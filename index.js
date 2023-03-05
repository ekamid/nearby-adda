const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const swaggerApiDoc = require("./src/config/swagger.json");

//config file
const { PORT, DATABASE_URL } = require("./src/config/enviroments");

//initialize app
const app = express();

//database connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("connected to db");
    }
  })
  .catch((err) => {
    console.error(`App Starting Error: ${err}`);
  });

// logger
//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// to allow cross origin resource sharing
app.use(cors());

const usersRouter = require("./src/routes/users");
const eventsRouter = require("./src/routes/events");

//Route Prefixes
app.use("/v1/users", usersRouter);
app.use("/v1/events", eventsRouter);
app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerApiDoc));

//api responses
const apiResponse = require("./src/helpers/apiResponse");
const { notFoundResponse, unauthorizedResponse } = apiResponse;

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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = {
  app,
};
