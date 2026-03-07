const Razorpay = require("razorpay");

let razorpayInstance = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log("Razorpay configured with provided keys");
  } catch (err) {
    console.error("Failed to create Razorpay instance:", err.message);
  }
} else {
  console.warn("Razorpay keys missing; payment functionality will be disabled.");
}

module.exports = razorpayInstance;
