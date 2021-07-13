const Favourites = require("../models/favourites.model");
const populateVideos = require("../utils/populateVideos.utils")

const createUserFavouriteDocument = async (req, res, next) => {
  try {
    const {user} = req;
    let favouriteVideo = await Favourites.findOne({ userId: user._id });

    if (!favouriteVideo) {
      favouriteVideo = new Favourites({ userId: user._id, videos: [] });
      favouriteVideo = await favouriteVideo.save();
    }
    req.favouriteVideo = favouriteVideo;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
      errorMessage: error.message,
    });
  }
};


const fetchUserFavouriteVideos = async (req, res) => {
  try {
    let { favouriteVideo } = req;
    let favouriteVideos = await populateVideos(favouriteVideo);
    res.json({ success: true, favouriteVideos });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch user's favourite videos",
    });
  }
};

const actionOnFavouriteVideos = async (req, res) => {
  const { _id } = req.body;
  const { favouriteVideo } = req;
  const videoExists = favouriteVideo.videos.some((video) => video._id == _id);
  if (videoExists) {
    for (let video of favouriteVideo.videos) {
      if (video._id == _id) {
        video.isActive = !video.isActive;
        break;
      }
    }
  } else {
    favouriteVideo.videos.push({ _id, isActive: true });
  }

  let updatedFavouriteVideo = await favouriteVideo.save();
  let favouriteVideos = await populateVideos(updatedFavouriteVideo);
  res.status(201).json({ success: true, favouriteVideos: favouriteVideos });
};

module.exports = {
  createUserFavouriteDocument,
  fetchUserFavouriteVideos,
  actionOnFavouriteVideos,
};
