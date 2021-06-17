const mongoose = require("mongoose");
const { Schema } = mongoose;

const watchLaterSchema = new Schema({
  watchLater: [],
});

const WatchLater = mongoose.model("WatchLater", watchLaterSchema);

module.exports = WatchLater;
