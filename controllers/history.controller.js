const _ = require("lodash");

const getHistory = async (req, res) => {
  const user = req.user;
  console.log(req.user);
  res.status(200).json({
    success: true,
    history: user.history,
  });
};
const addToHistory = async (req, res) => {
  const user = req.user;
  const { videoId } = req.body;
  try {
    user.history.push(videoId);
    await user.save();
    res.status(201).json({
      success: true,
      message: "Video added to user History",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error in adding video to history",
    });
  }
};
const removeFromHistory = async (req, res) => {
  const user = req.user;
  const { videoId } = req.body;
  try {
    user.history.pull(videoId);
    await user.save();
    res.status(201).json({
      success: true,
      message: "video removed from history",
      history: user.history,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in removing video from history",
      errMessage: err.errMessage,
    });
  }
};
const clearHistory = async (req, res) => {
  const user = req.user;
  try {
    user.history = [];
    await user.save();
    res.status(200).json({
      success: true,
      message: "cleared history",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "error in clearing history",
    });
  }
};
module.exports = {
  getHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
};
