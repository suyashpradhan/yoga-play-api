const WatchLater = require("../models/watchLater.model");
const populateVideos = require("../utils/populateVideos.utils")

const createUserWatchLaterDocument = async (req, res, next) => {
  try {
    const { user } = req;
    let watchLater = await WatchLater.findOne({ userId: user._id });
    if (!watchLater) {
      watchLater = new WatchLater({ userId: user._id, videos: [] });
      watchLater = await watchLater.save();
    }
    req.watchLater = watchLater;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      errorMessage: error.message,
    });
  }
};

const fetchUserWatchLaterVideos = async (req, res) => {
  try {
    let { watchLater } = req;
    let watchLaterVideos = await populateVideos(watchLater);
    console.log(watchLaterVideos);
    res.json({ success: true, watchLaterVideos });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch user's watch later videos",
    });
  }
};

const actionOnWatchLaterVideos = async (req, res) => {
  const { _id } = req.body;
  const { watchLater } = req;
  const videoExists = watchLater.videos.some((video) => video._id == _id);
  if (videoExists) {
    for (let video of watchLater.videos) {
      if (video._id == _id) {
        video.isActive = !video.isActive;
        break;
      }
    }
  } else {
    watchLater.videos.push({ _id, isActive: true });
  }

  let updatedWatchLaterVideo = await watchLater.save();
  let watchLaterVideos = await populateVideos(updatedWatchLaterVideo);
  res.status(201).json({ success: true, watchLaterVideos:watchLaterVideos });
};

module.exports = {
  createUserWatchLaterDocument,
  fetchUserWatchLaterVideos,
  actionOnWatchLaterVideos,
};
