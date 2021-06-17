const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavouritesSchema = new Schema({
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

const Favourites = mongoose.model("Favourites", FavouritesSchema);

module.exports = Favourites;
