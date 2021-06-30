const mongoose = require("mongoose");
require("dotenv").config();

const database = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("SERVER CONNECTED");
  } catch (err) {
    return err;
  }
};

module.exports = database;
