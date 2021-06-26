const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const db = require("./config/db-connection");
const videosRoute = require("./routes/videos.routes");
const authValidator = require("./middlewares/authValidator.middleware");
const registerUser = require("./routes/signup.routes");
const login = require("./routes/signIn.routes");
const historyRoute = require("./routes/history.routes");

const { addVideos } = require("./models/videos.model");

app.use(express.json());
app.use(cors());

//DB Connection
db();

app.get("/", (req, res) => {
  res.send(
    "An API for Yoga Play a video platform to get started with yoga and fitness."
  );
});

app.use("/videos", videosRoute);
app.use("/register", registerUser);
app.use("/login", login);
app.use(authValidator);
app.use("/history", historyRoute);

app.listen(PORT, () => console.log(`App running on ${PORT}`));
