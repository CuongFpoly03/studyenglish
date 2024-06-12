const { body } = require("express-validator");

function validateLogins() {
  return [
    body("username")
      .notEmpty()
      .withMessage("Vui lòng nhập tên người dùng")
      .isString()
      .withMessage("Tên người dùng phải là chuỗi"),
    body("password")
      .notEmpty()
      .withMessage("Vui lòng nhập mật khẩu")
      .isString()
      .withMessage("Mật khẩu phải là chuỗi"),
  ];
}

function validateRegister() {
  return [
    body("email")
      .notEmpty()
      .withMessage("Vui lòng nhập email")
      .isEmail()
      .withMessage("Email không hợp lệ"),
    body("password")
      .notEmpty()
      .withMessage("Vui lòng nhập mật khẩu")
      .isLength({ min: 6 })
      .withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
    body("name")
      .notEmpty()
      .withMessage("Vui lòng nhập tên")
      .isString()
      .withMessage("Tên phải là chuỗi"),
    body("introdution")
      .optional()
      .isString()
      .withMessage("Giới thiệu phải là chuỗi"),
    body("image").optional().isURL().withMessage("Hình ảnh không hợp lệ"),
    body("token").optional().isString().withMessage("Token phải là chuỗi"),
    body("verify")
      .optional()
      .isBoolean()
      .withMessage("Xác minh phải là boolean"),
  ];
}

module.exports = {
  validateLogins: validateLogins,
  validateRegister: validateRegister
}
