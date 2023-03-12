const apiResponse = require("../../helpers/apiResponse");
const EventsService = require("./events.service");

const createEvent = async (req, res) => {
  const { user } = req;

  try {
    const event = await EventsService.createEvent({
      ...req.body,
      location: {
        type: "Point",
        coordinates: [req.body.longitude, req.body.latitude],
      },
      created_by: user.id,
    });

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

const getEvents = async (req, res, next) => {
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
  const { params } = req;

  try {
    const event = await EventsService.deleteEvent(params.id);

    if (!event) {
      return apiResponse.notFoundResponse(res, "Event not found");
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
};
