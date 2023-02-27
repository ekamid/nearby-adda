const { string } = require("joi");
const mongoose = require("mongoose");

const BookRequestPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: Array,
    },
    address: {
      type: string,
      required: true,
    },
    image: {
      type: mongoose.Schema.ObjectId,
      ref: "Upload",
    },
    goodreadsId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookRequest", BookRequestPostSchema);
