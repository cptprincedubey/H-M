const SellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");

const registerSellerController = async (req, res) => {
  try {
    let { sellerName, sellerPhone, sellerEmail, sellerAadhaar, password } =
      req.body;

    let existingSeller = await SellerModel.findOne({
      sellerEmail,
    });

    if (existingSeller)
      return res.status(422).json({
        message: "This SellerEmail is already exists",
      });

    let newSeller = await SellerModel.create({
      sellerName,
      sellerPhone,
      sellerEmail,
      sellerAadhaar,
      password,
    });

    if (!newSeller)
      return res.status(400).json({
        message: "Something went wrong",
      });

    let sellerToken = jwt.sign(
      { seller_id: newSeller._id },
      process.env.JWT_SELLER_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("sellerToken", sellerToken);

    return res.status(201).json({
      message: "Seller registered",
      seller: newSeller,
    });
  } catch (error) {
    console.log("error in seller register api->", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const sellerLoginController = async (req, res) => {
  try {
    let { sellerEmail, password } = req.body;

    let seller = await SellerModel.findOne({ sellerEmail });

    if (!seller)
      return res.status(404).json({
        message: "Seller not found",
      });

    let cp = seller.comparePass(password);

    if (!cp)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    return res.status(200).json({
      message: "Seller logged in",
      seller: seller,
    });
  } catch (error) {
    console.log("error in seller login", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

const getSellerProfileController = async (req, res) => {
  try {
    let sellerProfile = req.seller;

    if (!sellerProfile)
      return res.status(404).json({
        message: "Seller profile not found",
      });

    return res.status(200).json({
      message: "Seller profile fetched",
      profile: sellerProfile,
    });
  } catch (error) {
    console.log("error in seller profile", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

module.exports = {
  registerSellerController,
  sellerLoginController,
  getSellerProfileController,
};

