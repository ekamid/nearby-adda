const EventModel = require("../../models/Event");

const createEvent = async (eventData) => {
  return await EventModel.create(eventData);
};

module.exports = {
  createEvent,
};
