
const jwt = require("jsonwebtoken");
const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  updatePasswordController,
  meController,
} = require("../controllers/auth.controller");
const userSchemaValidationApi = require("../middlewares/authentication.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", userSchemaValidationApi, registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);
router.post("/update-password", authMiddleware, updatePasswordController);
router.get("/me", authMiddleware, meController);

module.exports = router;


