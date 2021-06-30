const express = require("express");
const router = express.Router();
const {
  getHistory,
  addToHistory,
  removeFromHistory,
  clearHistory,
} = require("../controllers/history.controller");

router.route("/").get(getHistory).post(addToHistory).delete(removeFromHistory);

module.exports = router;
