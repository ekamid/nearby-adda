const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return res.json({
    message:
      "Hello to the Nearby Adda API! Visit https://nearby-adda-api.vercel.app/v1/api-docs/ to see API documentation!",
  });
});

module.exports = router;
