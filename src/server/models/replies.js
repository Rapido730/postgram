const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  author_id: {
    type: String,
    required: true,
    ref: "user",
  },
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "comment",
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "post",
  },
  body: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("reply", replySchema);
