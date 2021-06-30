const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchLaterSchema = new Schema({
  videos: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
});

const WatchLater = mongoose.model("WatchLater", WatchLaterSchema);

module.exports = { WatchLater, WatchLaterSchema };
