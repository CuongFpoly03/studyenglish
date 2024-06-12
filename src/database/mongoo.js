const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_DB);
    console.log("Run DB success !");
  } catch (error) {
    console.error("error", error.message);
  }
};

module.exports  = connectDB
