const mongoose = require("mongoose");
const videosData = require("../data");
//Creating Mongoose Schema
const VideoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: String,
    required: true,
    unique: false,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  duration: {
    type: String,
    required: true,
    unique: false,
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  channelName: {
    type: String,
    required: true,
    unique: true,
  },
  channelImageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  publishedDate: {
    type: String,
    required: true,
    unique: true,
  },
  statistics: {
    viewsCount: {
      type: String,
      required: true,
      unique: false,
    },
    likesCount: {
      type: Number,
      required: true,
      unique: false,
    },
  },
});

//Creating Mongoose Model
const Video = mongoose.model("Video", VideoSchema);

const addVideos = async () => {
  try {
    videosData.forEach(async (video) => {
      const newVideo = new Video(video);
      const savedVideo = await newVideo.save();
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { Video, addVideos };
