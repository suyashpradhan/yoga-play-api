const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new Schema({
  videos: {
    type: mongoose.Types.ObjectId,
    ref: "Video",
  },
});

const History = mongoose.model("History", HistorySchema);

module.exports = { History, HistorySchema };
