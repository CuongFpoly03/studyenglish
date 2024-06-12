const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
    versionKey: false
  }
);
module.exports = mongoose.model("Favorite", favoriteSchema);
