const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, max: 12 },
    avatar: { type: String },
    verificationToken: { type: String },
    passwordResetToken: { type: String, default: null },
    published: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    active: { type: Boolean, default: 0 },
    role: {
      type: mongoose.Schema.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);

//hasing password
UserSchema.pre("save", function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

//compare password
UserSchema.methods.comparePassword = function (candidatePassword) {
  try {
    const isMatch = bcrypt.compareSync(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return err;
  }
};

module.exports = mongoose.model("User", UserSchema);
