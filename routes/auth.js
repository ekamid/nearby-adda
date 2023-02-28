const express = require("express");

const router = express.Router();

const AuthController = require("../controllers/users.controller");

// const {
//   registerValidationRules,
//   registerValidate,
//   loginValidationRules,
//   loginValidate,
// } = require("../middlewares/validators");

router.post(
  "/register",
  // registerValidationRules(),
  // registerValidate,
  AuthController.register
);

router.post(
  "/login",
  // loginValidationRules(),
  // loginValidate,
  AuthController.login
);

router.post("/password/forgot", AuthController.forgotPassword);
router.post("/password/reset/:token", AuthController.resetPassword);

module.exports = router;
