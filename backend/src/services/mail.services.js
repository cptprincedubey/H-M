const nodemailer = require("nodemailer");

// Create transporter with SMTP configuration
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    // Connection timeout settings
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
  });

  return transporter;
};

const transporter = createTransporter();

const sendMail = async (to, subject, html) => {
  try {
    // Test the connection
    await transporter.verify();
    console.log("SMTP server connection established");

    const mailOptions = {
      from: `"H&M Support" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
    };

    console.log("Sending email to:", to);
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Detailed email error:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
    });

    // Provide more specific error messages
    if (error.code === 'EAUTH') {
      throw new Error('Email authentication failed. Please check EMAIL_USER and EMAIL_PASS in environment variables.');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Unable to connect to email server. Please check your internet connection.');
    } else if (error.code === 'ETIMEDOUT') {
      throw new Error('Email server connection timed out. Please try again later.');
    } else {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }
};

module.exports = sendMail;
