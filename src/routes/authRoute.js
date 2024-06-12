const express = require("express");
const route = express.Router();
const authController = require("../controller/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateMiddleware = require("../middlewares/validateMiddleware");

route.post(
  "/register",
  authController.register,
  authMiddleware.authenticateUser,
  validateMiddleware.validateRegister
);
route.post(
  "/login",
  authController.login,
  authMiddleware.authenticateUser,
  authMiddleware.refreshAccessToken,
  validateMiddleware.validateLogins
);

route.post(
  "/google",
  authController.googleLogin,
  authMiddleware.googleAuthMiddleware
);


//doi mk
route.post("/changepw", authController.resetPasswordRequestdmk);
route.post(
  "/resetpw/:userId",
  authController.resetPassword,
  authMiddleware.resetPasswordMiddleware
);

//quen mk
route.post("/forgotpw",authMiddleware.resetPasswordRequest, authController.forgotPassword)

//logout
route.post("/logout", authController.logout);
module.exports = route;
