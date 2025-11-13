const express = require("express");
const { route } = require("./product.routes");
const {
  registerSellerController,
  sellerLoginController,
  getSellerProfileController,
} = require("../controllers/seller.Auth.controller");
const sellerMiddleware = require("../middlewares/seller.middleware");
const { message } = require("../validator/user.validation");

const router = express.Router();

router.post("/register", registerSellerController);
router.post("/login", sellerLoginController);
router.get("/profile", sellerMiddleware, getSellerProfileController);

module.exports = router;
