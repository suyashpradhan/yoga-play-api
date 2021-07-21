const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavouriteSchema = new Schema({
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

const Favourite = mongoose.model("Favourite", FavouriteSchema);

module.exports = Favourite;
