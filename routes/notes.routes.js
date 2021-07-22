const express = require("express");
const router = express.Router();
const {
  fetchUserNotes,
  createNewNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

const { fetchNoteById } = require("../controllers/paramHandlers.controller")

const { findVideo } = require("../controllers/video.controller");

router.param("videoId", findVideo);
router.route("/notes/:videoId").get(fetchUserNotes).post(createNewNote);

router.param("noteId", fetchNoteById);
router.route("/:noteId").post(updateNote).put(deleteNote);

module.exports = router;
