# Password Recovery System Setup Guide

## Overview
This document provides complete instructions for setting up and testing the password recovery system with nodemailer email functionality.

## Features Implemented

### 1. Forgot Password
- Users can request a password reset from the login page
- Requires a registered email address
- Sends a password reset link via email
- Link expires in 2 minutes for security

### 2. Reset Password
- Users can access the reset form via the email link
- Validates password requirements (minimum 6 characters)
- Confirms password match before submission
- Updates the password in the database

### 3. Update Password
- Logged-in users can change their current password
- Requires verification of current password
- Available from account menu in header
- Sends confirmation email after successful update

## Backend Setup

### 1. Environment Variables (.env)

Create a `.env` file in the `backend/` directory with the following variables:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://your_connection_string

# JWT Secrets
JWT_SECRET=your_very_secret_jwt_key
JWT_RAW_SECRET=your_very_secret_raw_key

# Email Configuration (Gmail with App Password)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Razorpay Configuration
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### 2. Gmail Setup (Nodemailer)

To use Gmail with nodemailer:

1. **Enable 2-Factor Authentication** on your Google Account
   - Go to https://myaccount.google.com/
   - Select "Security" in the left menu
   - Scroll down to "2-Step Verification" and enable it

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your setup)
   - Google will generate a 16-character password
   - Use this as `EMAIL_PASS` in your .env file

3. **Note**: Do NOT use your regular Gmail password. The app password is specifically for less secure apps.

### 3. Database Schema Update

The user model has been updated to include:
- `resetToken`: Stores the JWT token for password reset
- `resetTokenExpire`: Stores the expiration time of the reset token

This is handled automatically by the updated model.

### 4. API Routes

The following new routes have been added to `/api/auth/user`:

```
POST /api/auth/user/forgot-password
  - Body: { email }
  - Response: { message }

POST /api/auth/user/reset-password/:token
  - Body: { password, confirmPassword }
  - Response: { message }

POST /api/auth/user/update-password
  - Body: { currentPassword, newPassword, confirmPassword, userId }
  - Response: { message }
  - Note: Requires authentication
```

## Frontend Setup

### 1. New Routes Added

- `/forgot-password` - Forgot password request form
- `/reset-password/:token` - Password reset form with token
- `/update-password` - Authenticated user password update

### 2. Updated Components

**Header.jsx**
- Added account dropdown menu
- Shows user info when logged in
- "Change Password" link for logged-in users
- Login/Register options for guests

**Login.jsx**
- Added "Forgot Password?" link above login button

## Testing the System

### Test Case 1: Forgot Password Flow

1. Navigate to `http://localhost:5173/login`
2. Click "Forgot Password?" link
3. Enter your registered email address
4. Click "Send Reset Link"
5. Check your email for the reset link
6. Click the link (it will redirect to `/reset-password/:token`)
7. Enter new password and confirm
8. Click "Reset Password"
9. You should see success message and be redirected to login
10. Login with your new password

### Test Case 2: Update Password (Logged-in User)

1. Login to your account
2. Click on the account icon in header
3. Click "Change Password"
4. Enter current password
5. Enter new password (must be at least 6 characters)
6. Confirm the new password
7. Click "Update Password"
8. Confirmation email should be sent
9. You'll be redirected to home page

### Test Case 3: Error Handling

Test the following error scenarios:

**Forgot Password:**
- Empty email field
- Non-registered email address
- Invalid email format

**Reset Password:**
- Expired token (wait more than 2 minutes)
- Invalid token
- Non-matching passwords
- Password less than 6 characters

**Update Password:**
- Not logged in (should show login page)
- Incorrect current password
- Non-matching new passwords
- New password same as current password

## Email Templates

The system includes professionally styled HTML email templates:

1. **Password Reset Email**
   - Contains reset link
   - Shows 2-minute expiration notice
   - Professional gradient design

2. **Password Changed Confirmation**
   - Confirms successful password change
   - Security reminder for unauthorized changes
   - Professional formatting

3. **Password Updated Confirmation**
   - Confirms successful update for logged-in users
   - Sent after successful password change

## Security Features

1. **Token Expiration**: Reset tokens expire in 2 minutes
2. **Password Hashing**: Passwords are hashed with bcrypt before storage
3. **Email Verification**: Ensures user owns the email address
4. **HTTPS Recommended**: In production, use HTTPS for all auth endpoints
5. **HttpOnly Cookies**: Authentication tokens are stored as HttpOnly cookies

## Troubleshooting

### Email Not Sending

**Problem**: Emails are not being received
**Solutions**:
1. Verify `EMAIL_USER` and `EMAIL_PASS` in .env file
2. Check Gmail app password is correct (16 characters with spaces)
3. Ensure 2-Factor Authentication is enabled on Gmail account
4. Check server logs for error messages
5. Verify internet connection

### Reset Link Not Working

**Problem**: Clicking reset link shows error
**Solutions**:
1. Ensure link is clicked within 2 minutes
2. Verify `FRONTEND_URL` in backend .env matches your actual URL
3. Check token is not corrupted in email
4. Clear browser cache and try again

### Can't Login After Reset

**Problem**: Password still doesn't work after reset
**Solutions**:
1. Ensure you copied the entire password correctly
2. Check that Caps Lock is not on
3. Try forgot password again
4. Check email for any error notifications

## File Structure

```
backend/
├── src/
│   ├── models/user.model.js (Updated)
│   ├── controllers/auth.controller.js (Updated)
│   ├── routes/auth.routes.js (Updated)
│   ├── services/mail.services.js (Email service)
│   └── utils/email.template.js (Email templates)
├── .env.example (Rename to .env)
└── server.js

frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx (Updated)
│   │   ├── ForgotPassword.jsx (New)
│   │   ├── ResetPassword.jsx (New)
│   │   └── UpdatePassword.jsx (New)
│   ├── components/Header.jsx (Updated)
│   └── router/AppRouter.jsx (Updated)
```

## Running the Application

1. **Backend**:
   ```bash
   cd backend
   npm install
   # Create .env file with proper credentials
   npm run dev
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access**:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:4500`

## Production Considerations

1. Update `FRONTEND_URL` in .env for production domain
2. Change email service from Gmail to a professional email service (SendGrid, AWS SES, etc.)
3. Use environment-specific email templates
4. Set longer token expiration based on requirements
5. Implement rate limiting on password reset endpoint
6. Add CAPTCHA to prevent brute force attacks
7. Use HTTPS for all connections
8. Consider adding additional security headers

## Support

For issues or questions:
1. Check error messages in browser console
2. Review server logs in terminal
3. Verify all .env variables are set correctly
4. Ensure MongoDB is running and connected
5. Test with curl commands for API endpoints

---

**Last Updated**: February 22, 2026
**Version**: 1.0
