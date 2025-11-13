const mongoose = require("mongoose");
const { type } = require("../validator/user.validation");
const { string } = require("joi");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      currency: {
        type: String,
        enum: ["INR", "USD"],
        default: "INR",
      },
      amount: {
        type: Number,
        required: true,
      },
    },
    category: {
      type: String,
      enum: ["ladies, men, kids, beauty, home"],
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    sizes: [
      {
        type: String,
        enum: ["s", "m", "l", "xl", "xxl"],
        default: ["m"],
      },
    ],
    colors: [
      {
        type: String,
      },
    ],
    seller_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
    },
    razorpay_order_id: {
      type: String,
    },
    payment_status: {
      type: String,
      enum: ["pending", "failed", "success"],
    },
  },
  {
    timestamps: true,
  }
);

let ProductModel = mongoose.model("products", productSchema);
module.exports = ProductModel;
