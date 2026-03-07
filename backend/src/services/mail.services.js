const nodemailer = require("nodemailer");

// warn if credentials missing
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set – email functionality will fail.");
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
    port: 587,  // Use 587 with STARTTLS for better compatibility
    secure: false,  // false for 587, true for 465
    auth: {
      user: emailUser,
      pass: emailPass,
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2',
    },
    // Connection timeout settings
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    pool: {
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
    },
  });

  return transporter;
};

let transporter = createTransporter();
let isEmailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

// Verify connection asynchronously, don't block startup if it fails
if (isEmailConfigured) {
  transporter.verify()
    .then(() => {
      console.log("✅ Mail transporter verified successfully");
    })
    .catch((err) => {
      console.warn("⚠️ Mail transporter verification warning (will retry on first use):", err.message);
    });
}
// Retry logic for sending emails
const sendMailWithRetry = async (to, subject, html, retries = 3, delay = 2000) => {
  if (!isEmailConfigured) {
    throw new Error('Email service is not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.');
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const mailOptions = {
        from: `"H&M Support" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html,
        replyTo: process.env.EMAIL_USER,
        bcc: process.env.EMAIL_USER,
      };

      console.log(`[Attempt ${attempt}/${retries}] Sending email to:`, to);
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully:", info.messageId);
      return info;
    } catch (error) {
      console.error(`[Attempt ${attempt}/${retries}] Email send failed:`, {
        message: error.message,
        code: error.code,
      });

      // Check if it's a retryable error
      const isRetryable = ['ENETUNREACH', 'ETIMEDOUT', 'ECONNREFUSED', 'EHOSTUNREACH'].includes(error.code);

      if (isRetryable && attempt < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // Non-retryable error or final attempt failed
      if (error.code === 'EAUTH') {
        throw new Error('Email authentication failed. Check EMAIL_USER and EMAIL_PASS environment variables.');
      } else if (error.code === 'ENETUNREACH' || error.code === 'EHOSTUNREACH') {
        throw new Error('Network unreachable. Unable to connect to email server. Check your internet connection.');
      } else if (error.code === 'ETIMEDOUT') {
        throw new Error('Email server connection timed out. Server may be temporarily unavailable.');
      } else if (error.code === 'ECONNREFUSED') {
        throw new Error('Connection refused by email server. Check SMTP settings.');
      } else {
        throw new Error(`Failed to send email after ${retries} attempts: ${error.message}`);
      }
    }
  }
};

const sendMail = async (to, subject, html) => {
  try {
    return await sendMailWithRetry(to, subject, html);
  } catch (error) {
    console.error("Final email error:", error.message);
    throw error;
  }
};

module.exports = sendMail;
