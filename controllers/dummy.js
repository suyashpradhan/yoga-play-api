const Favourites = require("../models/favourites.model");

const createUserFavoritesDocument = async (req, res, next) => {
  try {
    const {user} = req;
    let favurites = await Favourites.findOne({ userId: user._id });

    if (!favurites) {
      favurites = new Favourites({ userId: user._id, videos: [] });
      favurites = await favurites.save();
    }
    req.favurites = favurites;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
      errorMessage: error.message,
    });
  }
};

const populateFavouriteVideos = async (favouriteVideos) => {
  favouriteVideos.videos = favouriteVideos.videos.filter((video) => video.isActive);
  favouriteVideos = await favouriteVideos.populate("videos._id").execPopulate();
  return favouriteVideos.videos.map((video) => video._id);
};

const fetchUserFavourites = async (req, res) => {
  try {
    let { favourites } = req;
    let favouriteVideos = await populateFavouriteVideos(favourites);
    res.json({ success: true, favouriteVideos });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch videos",
      errMessage: err.message,
    });
  }
};

const favouriteVideosAction = async (req, res) => {
  const { _id } = req.body;
  const { favourites } = req;
  const videoExists = favourites.videos.some((video) => video._id == _id);
  if (videoExists) {
    for (let video of favourites.videos) {
      if (video._id == _id) {
        video.isActive = !video.isActive;
        break;
      }
    }
  } else {
    likedVideo.favourites.push({ _id, isActive: true });
  }

  let updatedFavouriteVideo = await favourites.save();
  let favouriteVideoItems = await populateFavouriteVideos(updatedFavouriteVideo);
  res.status(resStatus).json({ success: true, favouriteVideos: favouriteVideoItems });
};

module.exports = {
  createUserFavoritesDocument,
  fetchUserFavourites,
  favouriteVideosAction,
};
