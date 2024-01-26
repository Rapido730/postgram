const user = require("../models/user");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
require("dotenv").config();

const createToken = (User, payload) => {
  let token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  User = User.toObject();
  User.token = token;

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true, //It will make cookie not accessible on clinet side -> good way to keep hackers away
  };

  return { token, options };
};

//signup handle
exports.signup = async (req, res) => {
  try {
    //get input data
    const { name, email, otp } = req.body;
    // //console.log(req.body);
    // Check if All Details are there or not
    if (!name || !email || !otp) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    //check if use already exists?
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    // //console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const User = await user.create({
      name,
      email,
    });
    const payload = {
      email: User.email,
      id: User._id,
    };
    const { token, options } = createToken(User, payload);
    return res.cookie("token", token, options).status(200).json({
      success: true,
      User,
      token,
      message: "user created successfully ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User registration failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, otp } = req.body;
    //validation on email and password
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Plz fill all the details carefully",
      });
    }

    //check for registered User
    let User = await user.findOne({ email });
    //if user not registered or not found in database
    if (!User) {
      return res.status(401).json({
        success: false,
        message: "You have to Signup First",
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    // //console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const payload = {
      email: User.email,
      id: User._id,
    };
    //verify password and generate a JWt token 🔎
    if (otp === response[0].otp) {
      //if password matched
      //now lets create a JWT token
      const { token, options } = createToken(User, payload);
      // //console.log({ token });
      res.cookie("token", token, options).status(200).json({
        success: true,
        User,
        token,
        message: "Logged in Successfully✅",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login failure⚠️ :" + error,
    });
  }
};

// Send OTP For Email Verification
exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    // const checkUserPresent = await user.findOne({ email });
    // to be used in case of signup

    // If user found with provided email
    // if (checkUserPresent) {
    //   // Return 401 Unauthorized status code with error message
    //   return res.status(401).json({
    //     success: false,
    //     message: `User is Already Registered`,
    //   });
    // }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    //console.log("Result is Generate OTP Func");
    //console.log("OTP", otp);
    //console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    //console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    //console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    //extract JWT token
    const token = req.body.token || req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decode.email;

      const User = await user.findOne({ email: userEmail });
      if (!User) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        User,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "invalid Token ⚠️",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error Occured in Authentication ⚠️",
    });
  }
};
