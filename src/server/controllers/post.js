const comment = require("../models/comment");
const post = require("../models/post");
const user = require("../models/user");
const reply = require("../models/replies");
const mailSender = require("../utils/mailSender");

exports.getAllPostList = async (req, res) => {
  const authorEmail = req.userEmail;

  if (!authorEmail) {
    return res.status(403).send({
      success: false,
      message: "All Fields are required",
    });
  }

  const User = await user.findOne({ email: authorEmail });

  if (!User) {
    return res.status(401).json({
      success: false,
      message: "user not found",
    });
  }
  // //console.log("came");
  try {
    const posts = await post.find();
    //console.log({ posts });
    res.status(200).json({
      success: true,
      posts: posts,
      message: "query executed Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failure⚠️ :" + error,
    });
  }
};
exports.getPost = async (req, res) => {
  const { post_id } = req.body;

  if (!post_id) {
    return res.status(403).send({
      success: false,
      message: "All Fields are required",
    });
  }

  const Post = await post.findOne({ _id: post_id });

  if (!Post) {
    return res.status(401).json({
      success: false,
      message: "post not found",
    });
  }
  try {
    await Post.populate({
      path: "comments",
      match: true,
    });
    //console.log({ Post });
    res.status(200).json({
      success: true,
      post: Post,
      message: "query executed Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failure⚠️ :" + error,
    });
  }
};
exports.getPostList = async (req, res) => {
  const authorEmail = req.userEmail;

  if (!authorEmail) {
    return res.status(403).send({
      success: false,
      message: "All Fields are required",
    });
  }

  const User = await user.findOne({ email: authorEmail });

  if (!User) {
    return res.status(401).json({
      success: false,
      message: "user not found",
    });
  }
  //console.log({ User });
  try {
    await User.populate({
      path: "posts",
      match: true,
    });
    res.status(200).json({
      success: true,
      posts: User.posts,
      message: "query executed Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failure⚠️ :" + error,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const authorEmail = req.userEmail;

    const { title, body } = req.body;
    //console.log({ title, body, authorEmail });
    if (!title || !body) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const Post = await post.create({
      title,
      body,
      author_id: authorEmail,
    });

    await mailSender(
      authorEmail,
      title + " is posted",
      "Congrats your post is live now!!"
    );

    return res.status(200).json({
      success: true,
      Post,
      message: "Post created successfully ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Post creation failed",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const authorEmail = req.userEmail;

    const { body, post_id } = req.body;
    //console.log({ body, authorEmail, post_id });
    if (!body | !post_id) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const Post = await post.findOne({ _id: post_id });

    const Comment = await comment.create({
      author_id: authorEmail,
      post_id,
      body,
    });

    Post["comment_count"] = Post["comment_count"] + 1;

    await Post.save();
    await mailSender(
      authorEmail,
      "Someone comment on you post : " + Post.title,
      `${authorEmail} commented on your post ${Post.title}.`
    );
    return res.status(200).json({
      success: true,
      Comment,
      message: "Post created successfully ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Comment submission failed",
    });
  }
};

exports.addReply = async (req, res) => {
  try {
    const authorEmail = req.userEmail;

    const { body, post_id, comment_id } = req.body;
    //console.log({ body, authorEmail });
    if (!body | !post_id | !comment_id) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const Post = await post.findOne({ _id: post_id });

    const Reply = await reply.create({
      author_id: authorEmail,
      comment_id,
      body,
    });

    Post["reply_count"] = Post["reply_count"] + 1;

    await Post.save();

    return res.status(200).json({
      success: true,
      Reply,
      message: "Post created successfully ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Reply submission failed",
    });
  }
};
