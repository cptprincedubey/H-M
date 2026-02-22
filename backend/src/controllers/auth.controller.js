const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const sendMail = require("../services/mail.services");
const crypto = require("crypto");

const resetPassTemplate = (username, resetlink) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Password Reset</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
        <p style="color: #333; font-size: 16px;">Hello <strong>${username}</strong>,</p>
        <p style="color: #555;">We received a request to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetlink}" style="background-color: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
        </div>
        <p style="color: #999; font-size: 12px;">Or paste this link in your browser: <br><span style="word-break: break-all;">${resetlink}</span></p>
        <p style="color: #999; font-size: 12px;">This link expires in 2 minutes.</p>
        <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
      </div>
    </div>
  `;
};

const registerController = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;
    
    const existingUser = await UserModel.findOne({ email });

    console.log("exists--->", existingUser);

    if (existingUser)
      return res.status(400).json({
        message: "user already registered",
      });

    const newUser = await UserModel.create({
      name,
      email,
      phone,
      password,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000, // 1 hour
    });

    return res.status(201).json({
      message: "user registered",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.log("error in reg->", error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: messages.join(', '),
      });
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `${field} already exists`,
      });
    }
    
    return res.status(500).json({
      message: "internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(422).json({
        message: "Email and password Required",
      });

    const user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    let cp = await user.comparePass(password);

    if (!cp)
      return res.status(400).json({
        message: "incorrect email and password",
      });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({
      message: "User logged in",
      user: user,
      token: token,
    });
  } catch (error) {
    console.log("error in login->", error);
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};

const logoutController = async (req, res) => {
 try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
        
      });
    }

    await cacheInstance.set(token, "blacklisted");

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error: error,
    });
  }
};
const forgotPasswordController = async (req, res) => {
  try {
    let { email } = req.body;

    if (!email)
      return res.status(400).json({
        message: "Email is required",
      });

    let user = await UserModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found with this email",
      });

    // Generate reset token (expires in 2 minutes)
    let resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2min",
    });

    // Save reset token to database
    user.resetToken = resetToken;
    user.resetTokenExpire = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes
    await user.save();

    // Create reset link
    let resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;

    // Send email
    let emailHTML = resetPassTemplate(user.name, resetLink);
    try {
      await sendMail(user.email, "Reset Your Password", emailHTML);
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({
        message: "Failed to send reset password email",
      });
    }

    return res.status(200).json({
      message: "Reset password link has been sent to your email",
    });
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
const resetPasswordController = async (req, res) => {
  try {
    let { token } = req.params;
    let { password, confirmPassword } = req.body;

    if (!token)
      return res.status(400).json({
        message: "Reset token is required",
      });

    if (!password || !confirmPassword)
      return res.status(400).json({
        message: "Password and confirm password are required",
      });

    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Passwords do not match",
      });

    if (password.length < 6)
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });

    // Find user with reset token and token not expired
    let user = await UserModel.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: new Date() },
    });

    if (!user)
      return res.status(400).json({
        message: "Invalid or expired reset token. Please request a new one.",
      });

    // Update password
    user.password = password;
    user.resetToken = null;
    user.resetTokenExpire = null;
    await user.save();

    // Send confirmation email
    let emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Password Changed Successfully</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
          <p style="color: #333; font-size: 16px;">Hello <strong>${user.name}</strong>,</p>
          <p style="color: #555;">Your password has been successfully changed. You can now log in with your new password.</p>
          <p style="color: #999; font-size: 12px;">If you didn't change your password, please contact us immediately.</p>
        </div>
      </div>
    `;
    await sendMail(user.email, "Password Changed Successfully", emailHTML);

    return res.status(200).json({
      message: "Password has been reset successfully. You can now login with your new password.",
    });
  } catch (error) {
    console.log("error in resetPassword", error);
    return res.status(500).json({
      message: "internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    let user_id = req.user?._id || req.body.userId;
    let { currentPassword, newPassword, confirmPassword } = req.body;

    if (!user_id)
      return res.status(401).json({
        message: "User not authenticated. Please login first.",
      });

    if (!currentPassword || !newPassword || !confirmPassword)
      return res.status(400).json({
        message: "Current password, new password, and confirm password are required",
      });

    if (newPassword !== confirmPassword)
      return res.status(400).json({
        message: "New passwords do not match",
      });

    if (newPassword.length < 6)
      return res.status(400).json({
        message: "New password must be at least 6 characters long",
      });

    // Find user
    let user = await UserModel.findById(user_id);

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    // Verify current password
    let isPasswordCorrect = await user.comparePass(currentPassword);

    if (!isPasswordCorrect)
      return res.status(400).json({
        message: "Current password is incorrect",
      });

    // Update password
    user.password = newPassword;
    await user.save();

    // Send confirmation email
    let emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">Password Updated</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9; border-radius: 0 0 10px 10px;">
          <p style="color: #333; font-size: 16px;">Hello <strong>${user.name}</strong>,</p>
          <p style="color: #555;">Your password has been successfully updated.</p>
          <p style="color: #999; font-size: 12px;">If you didn't update your password, please contact us immediately.</p>
        </div>
      </div>
    `;
    await sendMail(user.email, "Password Updated Successfully", emailHTML);

    return res.status(200).json({
      message: "Password has been updated successfully",
    });
  } catch (error) {
    console.log("error in updatePassword", error);
    return res.status(500).json({
      message: "internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  updatePasswordController,
  meController: async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      return res.status(200).json({
        user: user,
      });
    } catch (error) {
      console.log("error in me", error);
      return res.status(500).json({
        message: "internal server error",
        error: error,
      });
    }
  },
};
