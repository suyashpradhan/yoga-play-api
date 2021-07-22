const express = require("express");
const { Video } = require("../models/videos.model");

const fetchAllVideos = async (req, res) => {
  try {
    const allVideos = await Video.find();
    res.status(200).json({ success: true, allVideos });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

const fetchSingleVideo = async (req, res) => {
  const { video } = req;
  res.status(201).json({ success: true, video });
};

module.exports = { fetchAllVideos, fetchSingleVideo };
