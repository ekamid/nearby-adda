const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

const {
  registerValidationRules,
  registerValidate,

  loginValidationRules,
  loginValidate,
} = require("../middlewares/validators");

//controllers
const {
  createUser,
  loginUser,
  getAuthenticatedUser,
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

module.exports = router;
