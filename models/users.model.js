const mongoose = require("mongoose");
const moment = require("moment-timezone");
const bcrypt = require("bcryptjs");
const { isStrongPassword, isEmail } = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Email is invalid"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [
      isStrongPassword,
      "Password requirements: Minimum 8 characters long, One Uppercase Character, One Lowercase Character & One Special Character",
    ],
  },
});

//Middleware after user is created!
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Static method for login
userSchema.statics.login = async function (email, password) {
  const matchedUser = await this.findOne({ email });

  if (matchedUser) {
    const auth = await bcrypt.compare(password, matchedUser.password);
    if (auth) {
      return matchedUser;
    }
  }
  throw Error("invalid");
};

const User = mongoose.model("Users", userSchema);

module.exports = { User, userSchema };
