const HTTP_CODE_ERRORS = require("../constants/Errorr");
const categoryModel = require("../models/categoryModel");

const getAll = async (req, res) => {
  try {
    const cate = await categoryModel.find();
    if (!cate) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(cate);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const getOneCate = async (req, res) => {
  try {
    const cateId = req.params.Id;
    const cate = await categoryModel.findById(cateId);
    if (!cate) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(cate);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const cate = await categoryModel.create(req.body);
    if (!cate) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(cate);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};
const updateCate = async (req, res) => {
  try {
    const cateId = req.params.Id;
    const cate = await categoryModel.findOneAndUpdate(
      { _id: cateId },
      req.body,
      {
        new: true,
      }
    );
    if (!cate) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(cate);
  } catch (error) {
    res
      .status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR)
      .json({ err: err.message });
  }
};

const removeCate = async (req, res) => {
  try {
    const cateId = req.params.Id;
    const cate = await categoryModel.findById({_id: cateId});
    if (!cate) {
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
  getOneCate: getOneCate,
  addCategory: addCategory,
  updateCate: updateCate,
  removeCate: removeCate,
};
