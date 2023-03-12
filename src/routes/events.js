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
  updateEvent,
} = require("../modules/events/events.controller");

router.get("/", getEvents);
router.get("/:id", getEvent);

router.use(auth);

router.post("/", createEvent);
router.delete("/:id", deleteEvent);
router.patch("/:id", updateEvent);

module.exports = router;
