const express = require("express");
const router = express.Router();

const {
  registerValidationRules,
  registerValidate,

  loginValidationRules,
  loginValidate,
} = require("../middlewares/validators");

//controllers
const { createUser, loginUser } = require("../modules/users/users.controller");

router.post("/", registerValidationRules(), registerValidate, createUser);
router.post("/login", loginValidationRules(), loginValidate, loginUser);

module.exports = router;
