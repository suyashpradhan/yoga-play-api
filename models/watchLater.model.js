const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchLaterSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  videos: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        ref: "Video",
      },
      isActive: Boolean
    },
  ],
});

const WatchLater = mongoose.model("WatchLater", WatchLaterSchema);

module.exports = WatchLater;
