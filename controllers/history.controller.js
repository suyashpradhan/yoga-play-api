const History = require("../models/history.model");
const { concat, remove } = require("lodash");
const populateVideos = require("../utils/populateVideos.utils")

const createUserHistoryDocument = async (req, res, next) => {
  try {
    const { user } = req;
    let history = await History.findOne({ userId: user._id });

    if (!history) {
      history = new History({ userId: user._id, videos: [] });
      history = await history.save();
    }
    req.history = history;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create user's watch history",
      errorMessage: error.message,
    });
  }
};

const fetchUserWatchHistory = async (req, res) => {
  try {
    let { history } = req;
    let videosInHistory = await populateVideos(history);
    res.status(200).json({ success: true, videosInHistory: videosInHistory });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch user's watch history",
      errMessage: err.message,
    });
  }
};

const addVideoInHistory = async (req, res) => {
  const { _id } = req.body;
  const { history } = req;
  const videoExists = history.videos.some((video) => video._id == _id);
  if (videoExists) {
    remove(history.videos, (video) => video._id == _id);
    history.videos = concat(history.videos, { _id, isActive: true });
  } else {
    history.videos.push({ _id, isActive: true });
  }

  let updatedHistory = await history.save();
  let videosInHistory = await populateVideos(updatedHistory);
  res.status(200).json({ success: true, videosInHistory });
};

const removeVideoFromHistory = async (req, res) => {
  const { _id } = req.body;
  const { history } = req;
  for (let video of history.videos) {
    if (video._id == _id) {
      video.isActive = false;
      break;
    }
  }
  let updatedHistory = await history.save();
  let videosInHistory = await populateVideos(updatedHistory);
  res.status(200).json({ success: true, history: videosInHistory });
};

const clearUserHistory = async (req, res) => {
  let { history } = req;
  for (let video of history.videos) {
    video.isActive = false;
  }
  let clearedHistory = await history.save();
  let videosInHistory = await populateVideos(clearedHistory);
  res.status(200).json({ success: true, history: videosInHistory });
};

module.exports = {
  createUserHistoryDocument,
  fetchUserWatchHistory,
  addVideoInHistory,
  removeVideoFromHistory,
  clearUserHistory,
};
