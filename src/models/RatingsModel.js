const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vocabularyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vocabulary",
      required: true,
    },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Ratings", ratingSchema);
