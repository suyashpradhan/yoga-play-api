const Note = require("../models/notes.model")

const fetchNoteById = async (req, res, next, noteId) => {
  const note = await Note.findOne({ _id: noteId });
  if (!note) {
    throw Error("Something went wrong");
  }
  req.note = note;
  next();
};

module.exports = { fetchNoteById }