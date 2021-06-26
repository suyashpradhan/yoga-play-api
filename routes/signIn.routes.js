const { userLogin } = require("../controllers/signIn.controller");
const router = require("express").Router();

router.route("/").post(userLogin);

module.exports = router;
