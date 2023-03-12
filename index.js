const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const swaggerApiDoc = require("./src/config/swagger.json");

const path = require("path");

//config file
const { PORT, DATABASE_URL } = require("./src/config/enviroments");

//initialize app
const app = express();

console.log("DATABASE_URL");
console.log(DATABASE_URL);

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

//file show

let dir = path.join(__dirname, "/");
app.use(express.static(dir));

const mime = {
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
};

app.get("*", function (req, res) {
  let file = path.join(dir, req.path.replace(/\/$/, "/index.html"));
  if (file.indexOf(dir + path.sep) !== 0) {
    return res.status(403).end("Forbidden");
  }
  let type = mime[path.extname(file).slice(1)] || "text/plain";
  let s = fs.createReadStream(file);
  s.on("open", function () {
    res.set("Content-Type", type);
    s.pipe(res);
  });
  s.on("error", function () {
    res.set("Content-Type", "text/plain");
    res.status(404).end("Not found");
  });
});

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
  console.log(`App listening on port ${PORT}`);
});

module.exports = {
  app,
};
