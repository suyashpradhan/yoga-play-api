const express = require("express");
const errorHandler = require("../utils/errorHandling.js");
const createToken = require("../utils/createToken.js");
const { User } = require("../models/users.model");

const createNewUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const savedUser = await User.create({
      fullName,
      email,
      password,
      playlists: [],
      history: [],
      likedVideos: [],
      watchLater: [],
    });
    const token = createToken(savedUser._id);
    res.status(200).json({
      success: true,
      message: "Succesfully signed up.",
      _id: savedUser._id,
      token,
    });
  } catch (error) {
    const errors = errorHandler(error);
    res.status(401).json({ errors });
  }
};

module.exports = { createNewUser };
