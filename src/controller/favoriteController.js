const HTTP_CODE_ERRORS = require("../constants/Errorr");
const favoriteModel = require("../models/FavoritesModel");
const vocabularyModel = require("../models/vocabularyModel");

const logFavorite = async (req, res) => {
  try {
    const { userId, vocabularyId } = req.body;

    const existingFavorite = await favoriteModel.findOne({
      userId,
      vocabularyId,
    });

    // Nếu đã tồn tại, trả về lỗi
    if (existingFavorite) {
      return res
        .status(HTTP_CODE_ERRORS.BAD_REQUEST)
        .json({ err: "This vocabulary is already in the favorite list" });
    }

    const vocabulary = await vocabularyModel.findOne(
      { _id: vocabularyId },
      "word meaning"
    );
    if (!vocabulary) {
      return res
        .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
        .json({ err: "Failed to find vocabulary" });
    }

    const newFavorite = await favoriteModel.create({ userId, vocabularyId });
    if (!newFavorite) {
      return res
        .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
        .json({ err: "Failed to add to favorite list" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json({
      word: vocabulary.word,
      meaning: vocabulary.meaning,
      favorite: newFavorite,
    });
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const Favorite = await favoriteModel.find();
    if (!Favorite) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(Favorite);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const getOneFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.Id;
    const Favorite = await favoriteModel.findById(favoriteId);
    if (!Favorite) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(Favorite);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const Favorite = await favoriteModel.create(req.body);
    if (!Favorite) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(Favorite);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};
const updateFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.Id;
    const Favorite = await favoriteModel.findOneAndUpdate(
      { _id: favoriteId },
      req.body,
      {
        new: true,
      }
    );
    if (!Favorite) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(Favorite);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.Id;
    const Favorite = await favoriteModel.findById({ _id: favoriteId });
    if (!Favorite) {
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
  getOneFavorite: getOneFavorite,
  addFavorite: addFavorite,
  updateFavorite: updateFavorite,
  removeFavorite: removeFavorite,
  logFavorite: logFavorite,
};
