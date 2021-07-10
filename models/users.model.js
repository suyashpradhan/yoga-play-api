const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isStrongPassword, isEmail } = require("validator");
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
  },
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
UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("Users", UserSchema);

module.exports = { User, UserSchema };
