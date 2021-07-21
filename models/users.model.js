const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});


const User = mongoose.model("Users", UserSchema);

module.exports = { User, UserSchema };
