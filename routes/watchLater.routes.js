const express = require("express");
const router = express.Router();
const { createUserWatchLaterDocument, fetchUserWatchLaterVideos, actionOnWatchLaterVideos } = require("../controllers/watchLater.controller");

router.use(createUserWatchLaterDocument);

router.route("/")
  .get(fetchUserWatchLaterVideos)
  .post(actionOnWatchLaterVideos);

module.exports = router;