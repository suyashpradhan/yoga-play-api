const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  playListName: {
    type: String,
    required: [true, "Playlist name should not be empty"],
  },
  playListDescription: {
    type: String,
  },
  video: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
});

const Playlists = mongoose.model("Playlists", PlaylistSchema);

module.exports = { Playlists, PlaylistSchema };
