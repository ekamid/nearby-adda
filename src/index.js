const express = require("express");
const { PORT } = require("./config/enviroments");
const { databaseConnection } = require("./database");
const expressApp = require("./express-app");
const logger = require("morgan");
const redisClient = require("./config/redis");
const app = express();

const StartServer = async () => {
  //connecting to database
  await databaseConnection();

  // Use the Redis client globally
  app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
  });

  // logger
  //don't show the log when it is test
  if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"));
  }

  //express app
  await expressApp(app);

  //running the server
  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();

module.exports = { app };
