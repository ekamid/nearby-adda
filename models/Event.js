const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    startDate: {
      type: Date,
      required: true,
      //   validate: {
      //     validator: function (value) {
      //       return value > new Date();
      //     },
      //     message: (props) =>
      //       `${props.path} must be greater than the current date and time.`,
      //   },
    },
    endDate: {
      type: Date,
      required: false,
      //   validate: {
      //     validator: function (value) {
      //       return value > this.date;
      //     },
      //     message: "End date must be greater than the start date.",
      //   },
    },
    canceled: { type: Boolean, default: false },
    canceledMessage: { type: String, default: null },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    joined_by: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    created_by: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
