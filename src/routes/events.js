const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// const { validate } = require("../middlewares/validators");

//controllers
const {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent,
} = require("../modules/events/events.controller");

router.get("/", getEvents);
router.get("/:id", getEvent);

router.use(auth);

router.post("/", createEvent);
// router.delete("/:id", deleteEvent);

module.exports = router;
