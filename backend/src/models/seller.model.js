const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    sellerName: {
      type: String,
      required: true,
    },
    sellerPhone: {
      type: String,
      maxLength: 10,
      minLength: 10,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
      unique: true,
    },
    sellerAadhaar: {
      type: String,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

sellerSchema.pre("save", async function (next) {
  let hashedPass = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
  next();
});

sellerSchema.methods.comparePass = async function (password) {
  let comparePass = await bcrypt.compare(password, this.password);
  return comparePass;
};

const SellerModel = mongoose.model("seller", sellerSchema);
module.exports = SellerModel;
