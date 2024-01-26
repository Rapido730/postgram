const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author_id: {
    type: String,
    required: true,
    ref: "user",
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "post",
  },
  body: { type: String, required: true, trim: true },
});

commentSchema.virtual("replies", {
  ref: "reply",
  localField: "_id",
  foreignField: "comment_id",
});

module.exports = mongoose.model("comment", commentSchema);

