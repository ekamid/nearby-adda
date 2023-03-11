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

    apiResponse.successResponseWithData(res, "Event Created Successfully!", {
      event,
    });
  } catch (err) {
    console.error(err);
    apiResponse.ErrorResponse(res, err);
  }
};

const getEvents = async (req, res, next) => {
  const { query } = req;
  try {
    const result = await EventsService.getPaginatedEvents(query);

    apiResponse.successResponseWithData(res, "Events successfully retrieved!", {
      ...result,
    });
  } catch (err) {
    console.log(err); // Output:
    apiResponse.ErrorResponse(res, err);
  }
};

module.exports = {
  createEvent,
  getEvents,
};
