const { concat, remove, pull } = require("lodash");
const History = require("../models/history.model");

//Create History For Newly Created User
const createHistory = async (req, res, next) => {
  const { user } = req;
  let history;

  try {
    history = await History.findOne({ userId: user._id });

    if (!history) {
      history = new History({ userId: user._id, videos: [] });
      history = await history.save();
    }

    req.history = history;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create history",
    });
  }
};

//Populate Videos In History
const populateVideosInHistory = async (history) => {
  const populatedData = await history.populate("videos._id").execPopulate();
  console.log("Line32", populatedData);
  const data = history.videos.map((video) => video._id);
  console.log("Line34", data);
};

//Fetch User Specific Videos In History
const fetchUserHistory = async (req, res) => {
  const { history } = req;
  try {
    await populateVideosInHistory(history);
    res
      .status(200)
      .json({ success: true, message: "Videos In History", history });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch videos",
      error: error.message,
    });
  }
};

//Post Method To Add Video In History Section
const addVideoToHistory = async (req, res) => {
  const { _id } = req.body;
  const { history } = req;
  history.videos.push(_id);

  const updatedHistory = await history.save();
  const videosInHistory = await populateVideosInHistory(updatedHistory);
  res.status(200).json({ success: true, history: videosInHistory });
};

const removeVideoFromHistory = async (req, res) => {
  const { _id } = req.body;
  const { history } = req;

  history.videos.pull(_id);
  const updatedHistory = await history.save();
  const videosInHistory = await populateVideosInHistory(updatedHistory);
  res.status(200).json({
    success: true,
    message: "Video Cleared from History",
    history: videosInHistory,
  });
};

const clearHistory = async (req, res) => {
  const { history } = req;

  try {
    history.videos = [];
    const updatedHistory = await history.save();
    const videosInHistory = await populateVideosInHistory(updatedHistory);
    res.status(200).json({
      success: true,
      message: "History Cleared",
      history: videosInHistory,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = {
  createHistory,
  fetchUserHistory,
  addVideoToHistory,
  removeVideoFromHistory,
  clearHistory,
};
