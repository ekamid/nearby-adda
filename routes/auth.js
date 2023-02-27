const express = require("express");

const authRouter = express.Router();

const AuthController = require("../controllers/AuthController");

// const {
//   registerValidationRules,
//   registerValidate,
//   loginValidationRules,
//   loginValidate,
// } = require("../middlewares/validators");

authRouter.post(
  "/register",
  // registerValidationRules(),
  // registerValidate,
  AuthController.register
);

authRouter.post(
  "/login",
  // loginValidationRules(),
  // loginValidate,
  AuthController.login
);

authRouter.post("/password/forgot", AuthController.forgotPassword);
authRouter.post("/password/reset/:token", AuthController.resetPassword);

module.exports = authRouter;
