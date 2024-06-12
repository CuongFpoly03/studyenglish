const HTTP_CODE_ERRORS = require("../constants/Errorr");
const historyModel = require("../models/LearningHistoryModel");
const vocabularyModel = require("../models/vocabularyModel");

const logEvent = async (req, res) => {
  try {
    const { userId, vocabularyId, action } = req.body;
    if (action !== "LEARN") {
      return res.status(HTTP_CODE_ERRORS.BAD_REQUEST).json({ err: "Invalid action type" });
    }
    const newHistory = await historyModel.create({
      userId,
      vocabularyId,
      action,
    });
    if (!newHistory) {
      return res.status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR).json({ err: "Failed to log event" });
    }
    const vocabulary = await vocabularyModel.findOne({ _id: vocabularyId }, 'word meaning');
    if (!vocabulary) {
      return res.status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR).json({ err: "Failed to find vocabulary" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json({ message: "Event logged successfully", word: vocabulary.word, meaning: vocabulary.meaning, history: newHistory});
  } catch (error) {
    return res.status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR).json({ err: error.message }); 
  }
};

//check xem bao nhiêu người đã học cái từ vựng này
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

const getAll = async (req, res) => {
  try {
    const History = await historyModel.find();
    if (!History) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(History);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const getOneHistory = async (req, res) => {
  try {
    const HistoryId = req.params.Id;
    const History = await historyModel.findById(HistoryId);
    if (!History) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(History);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const addHistory = async (req, res) => {
  try {
    const History = await historyModel.create(req.body);
    if (!History) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(History);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};
const updateHistory = async (req, res) => {
  try {
    const HistoryId = req.params.Id;
    const History = await historyModel.findOneAndUpdate(
      { _id: HistoryId },
      req.body,
      {
        new: true,
      }
    );
    if (!History) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(History);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const removeHistory = async (req, res) => {
  try {
    const HistoryId = req.params.Id;
    const History = await historyModel.findById({ _id: HistoryId });
    if (!History) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res
      .status(HTTP_CODE_ERRORS.OK)
      .json({ message: "delete success !" });
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

module.exports = {
  getAll: getAll,
  getOneHistory: getOneHistory,
  addHistory: addHistory,
  updateHistory: updateHistory,
  removeHistory: removeHistory,
  logEvent: logEvent,
  countLearnedVocabulary: countLearnedVocabulary,
};
