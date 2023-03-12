const apiResponse = require("../../helpers/apiResponse");
const EventsService = require("./events.service");

const createEvent = async (req, res) => {
  const { user } = req;

  try {
    // Create the event with location and created_by properties
    const event = await EventsService.createEvent(user.id, req.body);

    if (!event) {
      apiResponse.ErrorResponse(res, "Something went wrong");
    }

    return apiResponse.successResponseWithData(
      res,
      "Event Created Successfully!",
      {
        event,
      }
    );
  } catch (err) {
    console.error(err);
    return apiResponse.ErrorResponse(res, err);
  }
};

const updateEvent = async (req, res) => {
  const { user, params, body } = req;

  try {
    const event = await EventsService.getEventById(params.id);

    if (!event) {
      return apiResponse.notFoundResponse(res, "Event not found");
    }

    if (event.created_by.toString() !== user.id) {
      return apiResponse.ErrorResponse(
        res,
        "You do not have permission to update this event"
      );
    }

    const updatedEvent = await EventsService.updateEvent(event._id, body);

    return apiResponse.successResponseWithData(
      res,
      "Event updated Successfully!",
      {
        event: updatedEvent,
      }
    );
  } catch (err) {
    console.error(err);
    return apiResponse.ErrorResponse(res, err);
  }
};

const getEvents = async (req, res) => {
  const { query } = req;
  try {
    const result = await EventsService.getPaginatedEvents(query);

    return apiResponse.successResponseWithData(
      res,
      "Events successfully retrieved!",
      {
        ...result,
      }
    );
  } catch (err) {
    console.log(err); // Output:
    return apiResponse.ErrorResponse(res, err);
  }
};

const getEvent = async (req, res, next) => {
  const { params } = req;

  try {
    const event = await EventsService.getEventById(params.id);

    if (!event) {
      return apiResponse.notFoundResponse(res, "Event not found");
    }

    return apiResponse.successResponseWithData(
      res,
      "Event successfully retrieved!",
      {
        event,
      }
    );
  } catch (err) {
    console.log(err); // Output:
    return apiResponse.ErrorResponse(res, err);
  }
};

const deleteEvent = async (req, res, next) => {
  const { params, user } = req;

  try {
    const event = await EventsService.deleteEvent(params.id);

    if (!event) {
      return apiResponse.notFoundResponse(res, "Event not found");
    }

    if (event.created_by.toString() !== user.id) {
      return apiResponse.ErrorResponse(
        res,
        "You do not have permission to delete this event"
      );
    }

    return apiResponse.successResponse(res, "Event successfully deleted!");
  } catch (err) {
    console.log(err); // Output:
    return apiResponse.ErrorResponse(res, err);
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  deleteEvent,
  updateEvent,
};
