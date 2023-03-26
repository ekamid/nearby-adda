const express = require("express");
const path = require("path");

const {
  forbiddenResponse,
  notFoundResponse,
} = require("../helpers/apiResponse");

module.exports = (app) => {
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
      return forbiddenResponse(res, "Forbidden Request");
    }
    let type = mime[path.extname(file).slice(1)] || "text/plain";
    let s = fs.createReadStream(file);
    s.on("open", function () {
      res.set("Content-Type", type);
      s.pipe(res);
    });
    s.on("error", function () {
      return notFoundResponse(res, "Page not found");
    });
  });
};
