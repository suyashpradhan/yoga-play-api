const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    title: {
      type: String,
      required: [true, "Note Title is required"]
    }
    content: {
      type: String
    }
    isActive: {
      type: Boolean
    }
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;