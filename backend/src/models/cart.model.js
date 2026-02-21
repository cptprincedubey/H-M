const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        productName: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        size: String,
        color: String,
        images: [String],
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate totals before saving
cartSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  this.totalQuantity = this.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  next();
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;
