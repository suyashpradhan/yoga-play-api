const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new Schema({
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
      isActive:Boolean
    },
  ],
});

const History = mongoose.model("History", HistorySchema);

module.exports = History;
