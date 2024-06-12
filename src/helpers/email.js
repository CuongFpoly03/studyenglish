// helpers/emailHelper.js
const nodemailer = require("nodemailer");

const sendNewPasswordEmail = async (email, newPassword) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cuonglephu239@gmail.com",
        pass: "xfdy azbw mnnl sfan",
      },
    });
    const mailOptions = {
      from: "cuonglephu239@gmail.com",
      to: email,
      subject: "Your New Password",
      text: `Your new password is: ${newPassword}`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};
module.exports = {
  sendNewPasswordEmail,
};
