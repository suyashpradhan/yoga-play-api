const { createNewUser } = require("../controllers/signup.controller");
const router = require("express").Router();

router.route("/").get(async (req, res) => {
  res.status(200).json({ success: true, message: "Register User Here!" });
});
router.route("/").post(createNewUser);

module.exports = router;
