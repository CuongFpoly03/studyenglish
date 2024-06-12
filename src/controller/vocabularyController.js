const HTTP_CODE_ERRORS = require("../constants/Errorr");
const vocabularyModel = require("../models/vocabularyModel");

const getAll = async (req, res) => {
  try {
    const vocabulary = await vocabularyModel.find();
    if (!vocabulary) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(vocabulary);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const getOneVocabulary = async (req, res) => {
  try {
    const vocabularyId = req.params.Id;
    const vocabulary = await vocabularyModel.findById(vocabularyId);
    if (!vocabulary) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(vocabulary);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const addVocabularygory = async (req, res) => {
  try {
    const vocabulary = await vocabularyModel.create(req.body);
    if (!vocabulary) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(vocabulary);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};
const updateVocabulary = async (req, res) => {
  try {
    const vocabularyId = req.params.Id;
    const vocabulary = await vocabularyModel.findOneAndUpdate(
      { _id: vocabularyId },
      req.body,
      {
        new: true,
      }
    );
    if (!vocabulary) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(vocabulary);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const removeVocabulary = async (req, res) => {
  try {
    const vocabularyId = req.params.Id;
    const vocabulary = await vocabularyModel.findById({_id: vocabularyId});
    if (!vocabulary) {
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
  getOneVocabulary: getOneVocabulary,
  addVocabularygory: addVocabularygory,
  updateVocabulary: updateVocabulary,
  removeVocabulary: removeVocabulary,
};
