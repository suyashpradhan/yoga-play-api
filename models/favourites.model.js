const mongoose = require("mongoose");
const { Schema } = mongoose;

const FavouritesSchema = new Schema({
  videos: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
});

const Favourites = mongoose.model("Favourites", FavouritesSchema);

module.exports = { Favourites, FavouritesSchema };
