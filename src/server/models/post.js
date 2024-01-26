const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  author_id: { type: String, required: true, ref: "user" },
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true, trim: true },
  comment_count: { type: Number, default: 0 },
  reply_count: { type: Number, default: 0 },
});

postSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "post_id",
});

module.exports = mongoose.model("post", postSchema);
