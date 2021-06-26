const mongoose = require("mongoose");
const { Schema } = mongoose;

const historySchema = new Schema({
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
    },
  ],
});

const History = mongoose.model("History", historySchema);

module.exports = History;
