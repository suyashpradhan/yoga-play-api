const Note = require("../models/notes.model")

const fetchNoteById = async (req, res, next, noteId) => {
  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    throw Error("Something went wrong");
  }
  req.note = note;
  next();
};

const findVideoById = async (req, res, next, videoId) => {
  try {
    const video = await Video.findById(videoId);
    if (!video) {
      throw Error("Unable to fetch the video");
    }
    req.video = video;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Unable to retrive the video" });
  }
};

module.exports = { fetchNoteById, findVideoById }