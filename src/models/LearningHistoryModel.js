const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
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
    action: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = mongoose.model("History", historySchema);
