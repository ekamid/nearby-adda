require("dotenv").config();

const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: {
      type: String,
      required: false,
      default: `${process.env.BASE_PUBLIC_URL}/images/default/default-image.png`,
    },
    markerIconUrl: {
      type: String,
      required: false,
      default: `${process.env.BASE_PUBLIC_URL}/images/default/default_map_marker.webp`,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: false,
    },
    closed: { type: Boolean, default: false },
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
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

const Event = mongoose.model("Event", EventSchema);

Event.collection.createIndex({ location: "2dsphere" });

module.exports = Event;
