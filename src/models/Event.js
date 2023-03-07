const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    mapFlagIcon: { type: String, required: false },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
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
