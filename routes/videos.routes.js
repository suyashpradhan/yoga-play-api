const express = require("express");
const router = express.Router();

const {
  fetchAllVideos,
  fetchSingleVideo,
} = require("../controllers/videos.controller");

router.route("/").get(fetchAllVideos);
router.route("/:id").get(fetchSingleVideo);

module.exports = router;
