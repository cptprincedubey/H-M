const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, html) => {
  let newMail = {
    to,
    subject,
    html,
  };

  return await transporter.sendMail(newMail);
};

module.exports = sendMail;
