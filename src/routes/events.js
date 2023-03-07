const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// const { validate } = require("../middlewares/validators");

//controllers
const {
  createEvent,
  getEvents,
} = require("../modules/events/events.controller");

router.get("/", getEvents);

router.use(auth);

router.post("/", createEvent);

module.exports = router;
