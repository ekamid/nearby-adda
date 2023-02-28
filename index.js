const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");


//config file
const { PORT, DATABASE_URL } = require("./config/enviroments");

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

const usersRouter = require("./routes/users");

//Route Prefixes
app.use("/api/users", userRouter);

//api responses
const apiResponse = require("./helpers/apiResponse");
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
