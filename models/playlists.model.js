const mongoose = require("mongoose");
const { Schema } = mongoose;

const playlistsSchema = new Schema({
  playListName: {
    type: String,
    required: [true, "Playlist name should not be empty"],
  },
  videos: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const Playlists = mongoose.model("Playlists", playlistsSchema);

module.exports = Playlists;
