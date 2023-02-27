const mongoose = require("mongoose");

const GeneralPostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
    },
    image: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Upload",
      },
    ],
  },
  {
    timestamps: true,
  }
);

GeneralPostSchema.pre("save", function (next) {
  let post = this;
  //the post must have image or description

  if (!post.description || !post.image) {
    return next(new Error("Post must have description or image"));
  }

  next();
});

module.exports = mongoose.model("GeneralPost", GeneralPostSchema);
