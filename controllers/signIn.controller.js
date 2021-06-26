const errorHandler = require("../utils/errorHandling.js");
const createToken = require("../utils/createToken.js");
const { User } = require("../models/users.model");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({
      success: true,
      message: "LoggedIn Successfully",
      _id: user._id,
      token: token,
    });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(400).json({ success: false, errors });
  }
};

module.exports = { userLogin };
