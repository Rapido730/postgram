const { verify } = require("jsonwebtoken");

//auth

exports.auth = (req, res, next) => {
  try {
    //extract JWT token
    const token = req.body.token || req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }
    console.log(token)
    //verify the token
    try {
      const decode = verify(token, process.env.JWT_SECRET);
      req.userEmail = decode.email;
      console.log(req.userEmail);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "invalid Token ⚠️",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error Occured in Authentication ⚠️",
    });
  }
};
