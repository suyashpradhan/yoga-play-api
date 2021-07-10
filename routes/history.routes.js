const express = require("express");
const router = express.Router();
const {
  createUserHistoryDocument,
  fetchUserWatchHistory,
  addVideoInHistory,
  removeVideoFromHistory,
  clearUserHistory,
} = require("../controllers/history.controller");

router.use(createUserHistoryDocument);

router
  .route("/")
  .get(fetchUserWatchHistory)
  .post(addVideoInHistory)
  .put(removeVideoFromHistory)
  .delete(clearUserHistory);

module.exports = router;
