const express = require("express");
const router = express.Router();
const {createUserFavouriteDocument, fetchUserFavouriteVideos, actionOnFavouriteVideos} = require("../controllers/favourites.controller");
 
router.use(createUserFavouriteDocument);

router.route("/")
.get(fetchUserFavouriteVideos)
.post(actionOnFavouriteVideos);

module.exports = router;