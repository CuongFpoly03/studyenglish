const historyModel = require("../models/LearningHistoryModel");
const ratingModel = require("../models/RatingsModel");
const HTTP_CODE_ERRORS = require("../constants/Errorr");

const countLearnedVocabulary = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId:", userId);
    const learnedVocabularies = await historyModel
      .find({ userId: userId, action: "LEARN" })
      .distinct("vocabularyId");
    const result = [];
    for (const vocabularyId of learnedVocabularies) {
      const count = await historyModel.countDocuments({
        userId: userId,
        vocabularyId: vocabularyId,
        action: "LEARN",
      });
      result.push({ vocabularyId: vocabularyId, learnCount: count });
    }

    return res.status(HTTP_CODE_ERRORS.OK).json(result);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: error.message });
  }
};

const calculateRank = async (userId) => {
  try {
    const learnedVocabulariesCount = await historyModel.countDocuments({
      userId: userId,
      action: "LEARN",
    });

    let rank;
    let points;

    if (learnedVocabulariesCount >= 0 && learnedVocabulariesCount <= 10) {
      rank = 1;
      points = 10;
    } else if (
      learnedVocabulariesCount >= 11 &&
      learnedVocabulariesCount <= 20
    ) {
      rank = 2;
      points = 20;
    } else if (
      learnedVocabulariesCount >= 21 &&
      learnedVocabulariesCount <= 30
    ) {
      rank = 3;
      points = 30;
    }
    // Add more conditions for higher ranks as needed

    // Calculate points from ratings (if available)
    const ratings = await ratingModel.find({ userId: userId });
    const totalRatings = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRatings / ratings.length;

    // Combine points from vocabulary and ratings
    const finalPoints = points + averageRating;

    return { rank: rank, points: finalPoints }; 
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  countLearnedVocabulary: countLearnedVocabulary,
  calculateRank: calculateRank,
};
