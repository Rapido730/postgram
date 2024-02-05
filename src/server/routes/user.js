const express = require("express");
const router = express.Router();

//Handlers from controllers
const { login, signup, sendotp, getUser } = require("../controllers/auth");

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp/:purpose", sendotp);
router.post("/getuser", getUser);

module.exports = router;
