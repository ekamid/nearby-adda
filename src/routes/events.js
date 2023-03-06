const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// const { validate } = require("../middlewares/validators");

//controllers
const { createEvent } = require("../modules/events/events.controller");

router.use(auth);

router.post("/", createEvent);

module.exports = router;
