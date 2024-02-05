const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/authMiddle");

//Handlers from controllers
const {
  getPostList,
  createPost,
  getAllPostList,
  addReply,
  addComment,
  getPost,
  getPostComment,
  getCommentReplies,
  getCommentedPostList,
  getRepliedPostList,
} = require("../controllers/post");

router.post("/getpost", auth, getPost);
router.post("/getallpostlist", auth, getAllPostList);
router.post("/getpostlist", auth, getPostList);

router.post("/createpost", auth, createPost);

router.post("/addcomment", auth, addComment);

router.post("/addreply", auth, addReply);
router.post("/getpostcomment", auth, getPostComment);
router.post("/getcommentreplies", auth, getCommentReplies);
router.post("/getcommentedpostlist", auth, getCommentedPostList);
router.post("/getrepliedpostlist", auth, getRepliedPostList);
module.exports = router;
