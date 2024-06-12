const userModel = require("../models/userModel");
const HTTP_CODE_ERRORS = require("../constants/Errorr");

const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();
    if (!user) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(user);
  } catch (error) {
    return res.status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR).json({ err: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const Id = req.params.Id;
    const user = await userModel.findById(Id);
    if (!user) {
      return res.status(HTTP_CODE_ERRORS.NOT_FOUND).json({ err: "not/found" });
    }
    return res.status(HTTP_CODE_ERRORS.OK).json(user);
  } catch (error) {
    return res.status(HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR).json({ err: error.message });
  }
};

module.exports = {
  getAllUser,
  getOneUser
};
