const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

//config file
const { PORT, DATABASE_URL } = require("./config");

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

const db = mongoose.connection;

// logger
//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// to allow cross origin resource sharing
app.use(cors());

console.log("cors okay");

const authRouter = require("./routes/auth");
// const userRouter = require("./routes/user");

//Route Prefixes

app.use("/api/auth", authRouter);
// app.use("/api/user/", userRouter);
app.get("/home", (req, res) => {
  return res.status(200).json({
    success: true,
  });
});

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
