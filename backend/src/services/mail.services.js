const nodemailer = require("nodemailer");

// warn if credentials missing
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set – email functionality will fail.");
}

// Create transporter with SMTP configuration.  The function will honor the
// `EMAIL_SERVICE` env var if you want to switch to another provider later
// (e.g. SendGrid) without changing application code.
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

  // common options for all transports
  const common = {
    auth: { user: emailUser, pass: emailPass },
    tls: { rejectUnauthorized: false, minVersion: 'TLSv1.2' },
    connectionTimeout: parseInt(process.env.EMAIL_TIMEOUT || '30000', 10),
    greetingTimeout: parseInt(process.env.EMAIL_TIMEOUT || '30000', 10),
    socketTimeout: parseInt(process.env.EMAIL_TIMEOUT || '30000', 10),
    pool: {
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
    },
  };

  // support switching service via env var (gmail default)
  const service = (process.env.EMAIL_SERVICE || 'gmail').toLowerCase();
  switch (service) {
    case 'gmail':
      // try plain 587 first, fallback to 465 if verify fails
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        ...common,
      });
    case 'sendgrid':
      // for SendGrid we use API key authentication
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: { user: 'apikey', pass: process.env.SENDGRID_API_KEY },
        ...common,
      });
    default:
      console.warn(`⚠️ Unknown EMAIL_SERVICE '${service}', falling back to Gmail`);
      return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        ...common,
      });
  }
};

let transporter = createTransporter();
let isEmailConfigured = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);

// We attempt an initial verify but don't treat a failure as fatal.  Many
// cloud hosts block outbound SMTP or the provider may be slow; the retry
// logic in sendMailWithRetry will handle a timeout on the first real send.
async function verifyTransport() {
  if (!isEmailConfigured || process.env.SKIP_EMAIL_VERIFY === 'true') return;
  try {
    await transporter.verify();
    console.log('✅ Mail transporter verified successfully');
  } catch (err) {
    console.warn('⚠️ Mail transporter verification warning (will retry on first use):', err.message);
    // if using Gmail try the secure port as a fallback
    if ((process.env.EMAIL_SERVICE || '').toLowerCase() === 'gmail') {
      console.log('ℹ️ Retrying verification using secure port 465');
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: transporter.options.auth,
        tls: transporter.options.tls,
        connectionTimeout: transporter.options.connectionTimeout,
        greetingTimeout: transporter.options.greetingTimeout,
        socketTimeout: transporter.options.socketTimeout,
        pool: transporter.options.pool,
      });
      transporter.verify().then(() => {
        console.log('✅ Mail transporter verified on port 465');
      }).catch(e => {
        console.warn('⚠️ Second verification attempt failed:', e.message);
      });
    }
  }
}
verifyTransport();
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

      // if transport seems broken recreate it before retrying (sometimes the
      // socket is left in a bad state after a timeout)
      if (['ETIMEDOUT','ECONNREFUSED','ECONNRESET','EPIPE'].includes(error.code)) {
        console.log('🔄 Recreating transporter due to connection error');
        transporter = createTransporter();
      }

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
