const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpire: {
      type: Date,
      default: null,
    },
    favorites: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        productName: String,
        price: Number,
        images: [String],
        category: String,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let hashedPass = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
  next();
});

userSchema.methods.comparePass = async function (password) {
  let comparePass = await bcrypt.compare(password, this.password);
  return comparePass;
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
