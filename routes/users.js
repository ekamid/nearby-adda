const express = require("express");
const router = express.Router();

const {
  registerValidationRules,
  registerValidate,
} = require("../middlewares/validators");

//controllers
const { createUser } = require("../modules/users/users.controller");

router.post("/", registerValidationRules(), registerValidate, createUser);

module.exports = userRouter;
