const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    message: "Hello to the Nearby Adda API",
  });
});

module.exports = router;
