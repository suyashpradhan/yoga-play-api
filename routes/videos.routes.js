const express = require("express");
const router = express.Router();

const {
  fetchAllVideos,
  fetchSingleVideo,
} = require("../controllers/videos.controller");

const {findVideoById}  = require("../controllers/paramHandlers.controller")

//Route for fetching all videos
router.route("/").get(fetchAllVideos);

//Getting videoId via params
router.param("videoId",findVideoById);

//Fetching single video based on videoId
router.route("/:videoId").get(fetchAllVideos);

module.exports = router;
