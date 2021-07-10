const createToken = require("../utils/createToken.js");
const { User } = require("../models/users.model");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res) => {
  const { userName, password } = req.body;
  
  try {
    const user = await User.findOne({userName:userName});
    if (user.userName) {
      await bcrypt.compare(password, user.password);
      const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "LoggedIn Successfully",
      _id: user._id,
      token: token,
    });
    }else {
      res.status(401).json({
        success: false,
        message: "Username and password does not match",
      });
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = { userLogin };
