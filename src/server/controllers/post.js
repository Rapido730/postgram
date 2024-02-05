const comment = require("../models/comment");
const post = require("../models/post");
const user = require("../models/user");
const reply = require("../models/replies");
const mailSender = require("../utils/mailSender");
const replies = require("../models/replies");

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

exports.getCommentedPostList = async (req, res) => {
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

  const CommentList = await comment.find({ author_id: authorEmail });
  // console.log({ CommentList });

  const requiredPost_ids = CommentList.map((comment) =>
    comment.post_id.toString()
  );
  // console.log({ requiredPost_ids });
  const PostList = await post.find({ _id: { $in: requiredPost_ids } });
  // console.log({ PostList });
  try {
    res.status(200).json({
      success: true,
      posts: PostList,
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

exports.getRepliedPostList = async (req, res) => {
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

  const ReplyList = await replies.find({ author_id: authorEmail });
  // console.log({ CommentList });

  const requiredPost_ids = ReplyList.map((reply) => reply.post_id.toString());
  // console.log({ requiredPost_ids });
  const PostList = await post.find({ _id: { $in: requiredPost_ids } });
  // console.log({ PostList });
  try {
    res.status(200).json({
      success: true,
      posts: PostList,
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
      Post.author_id,
      "Someone comment on your post : " + Post.title,
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
    const Comment = await comment.findOne({ _id: comment_id });
    const Reply = await reply.create({
      author_id: authorEmail,
      comment_id,
      post_id,
      body,
    });

    Post["reply_count"] = Post["reply_count"] + 1;

    await Post.save();
    await mailSender(
      Post.author_id,
      "User are replying on your post : " + Post.title,
      `${authorEmail} replying on post for ${Post.title}.`
    );

    await mailSender(
      Comment.author_id,
      "User replied to your comment...",
      `${authorEmail} replied to your comment for ${Post.title}.`
    );
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

exports.getPostComment = async (req, res) => {
  try {
    const { post_id } = req.body;
    // console.log({ post_id });
    if (!post_id) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const comment_list = await comment.find({ post_id: post_id });

    return res.status(200).json({
      success: true,
      comment_list,
      message: "Comment fetched successfully ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Comment fetch failed",
    });
  }
};

exports.getCommentReplies = async (req, res) => {
  try {
    const { comment_id } = req.body;

    if (!comment_id) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const reply_list = await replies.find({ comment_id: comment_id });

    return res.status(200).json({
      success: true,
      reply_list,
      message: "Reply fetched successfully ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Reply fetch failed",
    });
  }
};
