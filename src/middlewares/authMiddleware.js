const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const crypto = require("crypto");
const User = require("../models/userModel");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
dotenv.config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
// Middleware để xác thực người dùng từ access token
const authenticateUser = (req, res, next) => {
  // Lấy access token từ cookie
  const accessToken = req.cookies.accessToken;
  // Kiểm tra xem access token có tồn tại không
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // Xác thực access token và lấy thông tin người dùng
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    req.user = decoded; // Lưu thông tin người dùng vào request để sử dụng ở các middleware tiếp theo
    next(); // Chuyển tiếp sang middleware tiếp theo
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Middleware để xác thực và cập nhật access token từ refresh token
const refreshAccessToken = (req, res, next) => {
  // Lấy refresh token từ cookie
  const refreshToken = req.cookies.refreshToken;
  // Kiểm tra xem refresh token có tồn tại không
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // Xác thực refresh token và lấy thông tin người dùng từ
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    req.user = decoded; // Lưu thông tin người dùng vào request để sử dụng ở các middleware tiếp theo
    // Tạo mới access token và gắn vào cookie
    const newAccessToken = jwt.sign({ _id: decoded._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    res.cookie("accessToken", newAccessToken, { httpOnly: true });
    next(); // Chuyển tiếp sang middleware tiếp theo
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

//loginwith gg
const googleAuthMiddleware = async (req, res, next) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    // Thêm thông tin người dùng từ Google vào request để sử dụng trong controller
    req.googleUser = { email, name };
    next();
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

//change pw
const resetPasswordMiddleware = async (req, res, next) => {
  try {
    const { resetToken, newPassword } = req.body;
    // Tìm người dùng với token reset mật khẩu và thời gian hết hạn vẫn còn hiệu lực
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    // Cập nhật mật khẩu mới và thông tin liên quan trong cơ sở dữ liệu
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    // Thêm thông tin người dùng vào request để sử dụng trong controller
    req.user = user;
    next();
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// forgot mk
const resetPasswordRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Tạo một mật khẩu mới ngẫu nhiên có 6 ký tự
    const newPassword = generateRandomPassword(6);

    // Cập nhật mật khẩu mới cho người dùng
    user.password = newPassword;
    await user.save();

    // Gán mật khẩu mới vào request để sử dụng trong controller
    req.newPassword = newPassword;

    next(); // Chuyển sang controller để gửi email và phản hồi client
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const generateRandomPassword = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newPassword = "";
  for (let i = 0; i < length; i++) {
    newPassword += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return newPassword;
};

module.exports = {
  authenticateUser,
  refreshAccessToken,
  googleAuthMiddleware: googleAuthMiddleware,
  resetPasswordMiddleware: resetPasswordMiddleware,
  resetPasswordRequest: resetPasswordRequest,
};
