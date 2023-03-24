const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const { userCache } = require("../middlewares/cache");

const {
  registerValidationRules,
  loginValidationRules,
  updateAddressValidationRules,
  validate,
} = require("../middlewares/validators");

//controllers
const {
  createUser,
  loginUser,
  getAuthenticatedUser,
  updateUserAddress,
} = require("../modules/users/users.controller");

router.post("/register", registerValidationRules(), validate, createUser);
router.post("/login", loginValidationRules(), validate, loginUser);

router.use(auth);

router.get("/me", userCache, getAuthenticatedUser);

router.post(
  "/update-address",
  updateAddressValidationRules(),
  validate,
  updateUserAddress
);

module.exports = router;
