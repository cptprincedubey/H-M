const SellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");

const sellerMiddleware = async (req, res, next) => {
  try {
    let seller_token = req.cookies.sellerToken;

    if (!seller_token)
      return res.status(404).json({
        message: "seller token not found",
      });

    let decode = jwt.verify(seller_token, process.env.JWT_SELLER_SECRET);

    if (!decode)
      return res.status(400).json({
        message: "Invalid token",
      });

    let seller = await SellerModel.findById(decode.id);

    req.seller = seller;
    next();
  } catch (error) {
    console.log("error in seller middlleware", error);
  }
};

module.exports = sellerMiddleware;
