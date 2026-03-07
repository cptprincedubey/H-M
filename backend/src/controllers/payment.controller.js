const razorpayInstance = require("../config/razorpay");
const ProductModel = require("../models/product.model");
const CartModel = require("../models/cart.model");
const crypto = require("crypto");

const processPaymentController = async (req, res) => {
  try {
    const { amount, currency, user_id } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({
        status: false,
        message: "Valid amount is required",
      });
    }

    if (!currency) {
      return res.status(400).json({
        status: false,
        message: "Currency is required",
      });
    }

    // Validate Razorpay instance is available
    if (!razorpayInstance) {
      console.error("Razorpay instance not initialized; check keys");
      return res.status(500).json({
        status: false,
        message: "Payment gateway configuration error",
      });
    }

    // Convert amount to smallest currency unit (paise for INR)
    // Use Math.round to avoid floating point precision issues
    const amountInPaise = Math.round(Number(amount) * 100);

    if (amountInPaise < 100) {
      return res.status(400).json({
        status: false,
        message: "Minimum amount is ₹1",
      });
    }

    // Generate a short receipt ID (max 40 chars)
    // Format: receipt_<timestamp_last_8_digits>_<short_id>
    const timestamp = Date.now().toString().slice(-8);
    const shortId = (user_id || 'guest').toString().slice(-6);
    const receipt = `rcpt_${timestamp}_${shortId}`.slice(0, 40);
    
    const options = {
      amount: amountInPaise,
      currency: currency.toUpperCase() || "INR",
      receipt: receipt,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);
    // note: if razorpayInstance is misconfigured this will throw; we catch below

    if (!order || !order.id) {
      return res.status(500).json({
        status: false,
        message: "Failed to create order",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Order created successfully",
      order,
      razorpay_key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error in processPaymentController:", error);
    
    // Handle Razorpay specific errors
    if (error.error) {
      return res.status(400).json({
        status: false,
        message: error.error.description || "Payment order creation failed",
        error: error.error,
      });
    }

    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const verifyPaymentController = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      user_id,
      product_id,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !user_id
    ) {
      return res.status(400).json({
        status: false,
        message: "Missing payment verification details",
      });
    }

    // Validate Razorpay secret key is configured
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay secret key not configured");
      return res.status(500).json({
        status: false,
        message: "Payment gateway configuration error",
      });
    }

    // Verify signature
    const hmac = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    );
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const computed_signature = hmac.digest("hex");

    if (computed_signature !== razorpay_signature) {
      console.error("Signature verification failed", {
        computed: computed_signature,
        received: razorpay_signature,
      });
      return res.status(400).json({
        status: false,
        message: "Payment verification failed: Invalid signature",
      });
    }

    // For single product purchase, no global status set (products are not globally purchased)
    // For cart checkout, clear the user's cart
    if (!product_id) {
      // Clear user's cart after successful payment (cart checkout)
      await CartModel.findOneAndUpdate(
        { user_id },
        { items: [], totalAmount: 0, totalQuantity: 0 }
      );
    }

    return res.status(200).json({
      status: true,
      message: "Payment verified successfully",
      razorpay_order_id,
      razorpay_payment_id,
    });
  } catch (error) {
    console.error("Error in verifyPaymentController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  processPaymentController,
  verifyPaymentController,
};

