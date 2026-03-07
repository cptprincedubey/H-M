const nodemailer = require("nodemailer");

// warn if credentials missing
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("EMAIL_USER or EMAIL_PASS not set – email functionality will fail.");
}

// Create transporter with SMTP configuration
const createTransporter = () => {
  // trim credentials to avoid trailing/leading spaces
  const emailUser = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim() : '';
  if (process.env.EMAIL_USER && process.env.EMAIL_USER !== emailUser) {
    console.warn('⚠️ EMAIL_USER had extra whitespace; trimmed it');
  }
  if (process.env.EMAIL_PASS && process.env.EMAIL_PASS !== emailPass) {
    console.warn('⚠️ EMAIL_PASS had extra whitespace; trimmed it');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,  // changed to 465 for SSL (more reliable on cloud providers)
    secure: true,  // true for 465
    auth: {
      user: emailUser,
      pass: emailPass,
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

// Immediately verify connection when module loads - helps surface
// configuration issues early in logs.  Will not block startup.
transporter.verify().then(() => {
  console.log("Mail transporter verified");
}).catch(err => {
  console.error("Mail transporter verification failed:", err);
});
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
      // include replyTo and bcc so messages are easier to track and won't be
      // dropped by Gmail when sending to the same address
      replyTo: process.env.EMAIL_USER,
      bcc: process.env.EMAIL_USER,
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
