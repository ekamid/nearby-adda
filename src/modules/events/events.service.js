const { getPagination, getPagingData } = require("../../helpers/query");
const EventModel = require("../../models/Event");

const createEvent = async (eventData) => {
  return await EventModel.create(eventData);
};

const getPaginatedEvents = async (query) => {
  const { page, limit, search } = query;
  const { size, offset } = getPagination(page, limit);

  const filter = search ? { name: { $regex: search, $options: "i" } } : {};

  const count = await EventModel.countDocuments(filter);

  const results = await EventModel.find(filter)
    .sort({ createdAt: "desc" })
    .skip(offset) //started from 1
    .limit(size);

  const data = getPagingData(results, count, page, size);

  return data;
};

module.exports = {
  createEvent,
  getPaginatedEvents,
};
