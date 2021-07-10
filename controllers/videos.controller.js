const express = require("express");
const Video = require("../models/videos.model");

const fetchAllVideos = async (req, res) => {
  try {
    const allVideos = await Video.find();
    res.status(200).json({ success: true, allVideos });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

const fetchSingleVideo = async (req, res) => {
  const id = req.params.id;
  try {
    const video = await Video.findById(id).exec();
    res.status(200).json({ success: true, video });
  } catch (err) {
    res.status(400).json({ status: false, message: `Invalid Video Id` });
  }
};

module.exports = { fetchAllVideos, fetchSingleVideo };
