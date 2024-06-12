const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      maxLength: 100,
      unique: true,
    },
    name: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 300 },
    verify: { type: Boolean, required: true, default: false },
    introdution: { type: String, required: false, maxLength: 1000 },
    image: { type: String, required: false, maxLength: 1000 },
    token: { type: String, required: false, maxLength: 1000 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("User", userSchema);
