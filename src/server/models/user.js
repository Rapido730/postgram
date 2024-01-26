const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.virtual("posts", {
  ref: "post",
  localField: "email",
  foreignField: "author_id",
});

userSchema.virtual("comments", {
  ref: "comment",
  localField: "email",
  foreignField: "author_id",
});

module.exports = mongoose.model("user", userSchema);
