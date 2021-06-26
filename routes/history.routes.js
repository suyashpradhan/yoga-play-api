const express = require("express");
const router = express.Router();
const {
  createHistory,
  fetchUserHistory,
  addVideoToHistory,
  removeVideoFromHistory,
  clearHistory,
} = require("../controllers/history.controller");

router.use(createHistory);

router
  .route("/")
  .get(fetchUserHistory)
  .post(addVideoToHistory)
  .put(removeVideoFromHistory)
  .delete(clearHistory);

module.exports = router;
