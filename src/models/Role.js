const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
    required: true,
  },
  permissions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Permission",
    },
  ],
});

module.exports = mongoose.model("Role", RoleSchema);
