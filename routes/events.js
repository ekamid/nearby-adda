const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

router.use(auth);

router.get("/me", getAuthenticatedUser);

router.post(
  "/update-address",
  updateAddressValidationRules(),
  validate,
  updateUserAddress
);

module.exports = router;
