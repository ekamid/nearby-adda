const { getPagination, getPagingData } = require("../../helpers/query");
const { validateLatitudeLongitude } = require("../../helpers/validators");
const EventModel = require("../../database/models/Event");

const createEvent = async (created_by, eventData) => {
  const data = {
    ...eventData,
    location: {
      type: "Point",
      coordinates: [eventData.longitude, eventData.latitude],
    },
    created_by,
  };

  return await EventModel.create(data);
};

const updateEvent = async (eventId, eventData) => {
  const data = {
    ...eventData,
  };

  if (data.longitude && data.latitude) {
    data["location"] = {
      type: "Point",
      coordinates: [eventData.longitude, eventData.latitude],
    };
  }

  return await EventModel.findByIdAndUpdate(
    eventId,
    { ...data },
    { new: true }
  );
};

const getPaginatedEvents = async (query) => {
  const { page, limit, search, radius, latitude, longitude } = query;
  const { size, offset } = getPagination(page, limit);

  const filter = {};

  if (search) {
    filter["name"] = { $regex: search, $options: "i" };
  }

  //can't use filter with near operator in countDocuments
  let count = await EventModel.countDocuments(filter);

  if (radius && Number(radius)) {
    const validated = validateLatitudeLongitude(latitude, longitude);
    const maxDistance = radius * 1000; // 5km in meters
    if (validated) {
      filter["location"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: maxDistance,
        },
      };
    }
  }

  // EventModel.collection.createIndex({ location: "2dsphere" });
  const results = await EventModel.find(filter)
    .sort({ createdAt: "desc" })
    .skip(offset)
    .limit(size);

  if (filter.location) {
    count = results.length;
  }

  const data = getPagingData(results, count, page, size);

  return data;
};

const getEventById = async (id) => {
  return await EventModel.findById(id).lean();
};

const deleteEvent = async (id) => {
  return await EventModel.findByIdAndDelete(id);
};

module.exports = {
  createEvent,
  getPaginatedEvents,
  getEventById,
  deleteEvent,
  updateEvent,
};
