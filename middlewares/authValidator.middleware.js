const { User } = require("../models/users.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const authValidator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "User is not logged in" });
    }

    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({_id});
    if(!user){
        return res.status(401).json({success:false, errorMessage:"Unauthorized. Either user is not registered or Token is invalid."});
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authValidator;
