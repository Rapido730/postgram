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
} = require("../controllers/post");

router.post("/getpost", auth, getPost);
router.post("/getallpostlist", auth, getAllPostList);
router.post("/getpostlist", auth, getPostList);

router.post("/createpost", auth, createPost);

router.post("/addcomment", auth, addComment);

router.post("/addreply", auth, addReply);

module.exports = router;
