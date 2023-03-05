const apiResponse = require("../../helpers/apiResponse");
const EventsService = require("./events.service");

const createEvent = async (req, res) => {
  const { user, body } = req;

  try {
    const event = await EventsService.createEvent({
      ...req.body,
      created_by: user.id,
    });

    if (!event) {
      apiResponse.ErrorResponse(res, "Something went wrong");
    }

    apiResponse.successResponseWithData(res, "Event Created Successfully!", {
      event,
    });
  } catch (err) {
    console.log(err);
    apiResponse.ErrorResponse(res, err);
  }
};

module.exports = {
  createEvent,
};
