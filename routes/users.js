const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  registerValidationRules,
  registerValidate,

  loginValidationRules,
  loginValidate,

  updateAddressValidationRules,
  updateAddressValidate,
} = require("../middlewares/validators");

//controllers
const {
  createUser,
  loginUser,
  getAuthenticatedUser,
  updateUserAddress,
} = require("../modules/users/users.controller");

router.post(
  "/register",
  registerValidationRules(),
  registerValidate,
  createUser
);
router.post("/login", loginValidationRules(), loginValidate, loginUser);

router.use(auth);

router.get("/me", getAuthenticatedUser);

router.post(
  "/update-address",
  updateAddressValidationRules(),
  updateAddressValidate,
  updateUserAddress
);

module.exports = router;
