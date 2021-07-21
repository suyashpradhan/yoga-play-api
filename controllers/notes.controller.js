const Note = require("../models/notes.model");
const { extend } = require("lodash");

const fetchUserNotes = async (req, res) => {
  try {
    const { video } = req;
    let notes = await Note.find({ videoId: video._id });
    notes = notes.filter((note) => note.isActive);
    res.json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, errMessage: err.message });
  }
};

const createNewNote = async (req, res) => {
  try {
    const { user, video } = req;
    const { title, content } = req.body;
    let note = new Note({
      userId: user._id,
      videoId: video._id,
      title,
      content,
      isActive: true,
    });
    note = await note.save();
    res.status(201).json({ success: true, note });
  } catch (err) {
    res.status(500).json({
      success: false,
      errMessage: "Failed to add new note.",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    let { note } = req;
    const noteUpdates = req.body;
    if (note.isActive) {
      note = extend(note, noteUpdates);
      note = await note.save();
      res.json({ success: true, note });
    } else {
      throw Error("Failed to update note");
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, errMessage: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    let { note } = req;
    note.isActive = false;
    note = await note.save();
    res.json({ success: true, note });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, errMessage: "Failed to delete the note." });
  }
};

module.exports = {
  fetchUserNotes,
  createNewNote,
  updateNote,
  deleteNote,
};
