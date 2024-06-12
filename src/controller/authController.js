const User = require("../models/userModel");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendNewPasswordEmail } = require("../helpers/email");
const { OAuth2Client } = require("google-auth-library");
// const bcryptjs = require("bcryptjs")
const dotenv = require("dotenv");
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { TOKEN_SECRET } = process.env;

const register = async (req, res) => {
  try {
    const { email, name, password, verify, introdution, image, token } =
      req.body;
    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" }); // Trả về lỗi nếu email đã tồn tại
    }
    // Mã hóa mật khẩu bằng Argon2
    const hashedPassword = await argon2.hash(password);
    // const hashedPassword = await bcryptjs.hash(userData.password, 10); // Sử dụng bcryptjs
    // Tạo người dùng mới với mật khẩu đã được mã hóa
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      verify,
      introdution,
      image,
      token,
    });
    // Lưu người dùng mới vào cơ sở dữ liệu
    const savedUser = await newUser.save();
    // Trả về thông báo thành công và thông tin người dùng đã được tạo
    res
      .status(201)
      .json({ message: "User registered successfully", data: savedUser });
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" }); // Trả về lỗi nếu có lỗi xảy ra
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Tìm người dùng trong cơ sở dữ liệu bằng email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not found" }); // Trả về lỗi nếu email không tồn tại
    }
    // So sánh mật khẩu đã mã hóa với mật khẩu được cung cấp
    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" }); // Trả về lỗi nếu mật khẩu không chính xác
    }
    // Tạo token
    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET, {
      expiresIn: "1h",
    });
    // Trả về token và thông tin người dùng
    res.status(200).json({
      message: "Login successfully",
      token,
      user: { _id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" }); // Trả về lỗi nếu có lỗi xảy ra
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

//login with google
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;
    // Tạo hoặc cập nhật thông tin người dùng trong cơ sở dữ liệu
    // Trả về token và thông tin người dùng
    res.status(200).json({
      message: "Login successfully with Google",
      token,
      user: { email, name },
    });
  } catch (error) {
    console.error("Error logging in with Google:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//đổi mk
const resetPasswordRequestdmk = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Hết hạn trong 1 giờ
    await user.save();
    // Gửi email chứa liên kết reset mật khẩu
    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newPassword = req.body.newPassword; // Lấy mật khẩu mới từ request

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } 

    // Đặt lại mật khẩu của người dùng
    user.password = newPassword;
    await user.save();

    // Trả về thông báo thành công
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// quên mật khẩu
const forgotPassword = async (req, res) => {
  try {
    // Lấy mật khẩu mới từ request
    const newPassword = req.newPassword;
    // Gửi email chứa mật khẩu mới đến địa chỉ email của người dùng
    await sendNewPasswordEmail(req.body.email, newPassword);

    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register: register,
  login: login,
  logout: logout,
  googleLogin: googleLogin,
  resetPasswordRequestdmk: resetPasswordRequestdmk,
  resetPassword: resetPassword,
  forgotPassword: forgotPassword,
};
