# Email Setup Guide - H&M E-Commerce

## Problem Fixed
✅ Mail transporter verification error (ENETUNREACH) has been fixed with:
- Switched from port 465 (SSL) to port 587 (STARTTLS) for better compatibility
- Added retry logic for network failures
- Improved error handling with specific error messages
- Made verification non-blocking (won't crash server if email setup fails)
- Added connection pool and rate limiting

## Setup Instructions

### Step 1: Enable Gmail App Passwords

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled)
4. Go back to **Security** and find **App passwords**
5. Select **Mail** and **Windows Computer** (or your device)
6. Google will generate a 16-character password like: `abcd efgh ijkl mnop`
7. **Copy this password** (without spaces)

### Step 2: Configure Environment Variables

Create or update your `.env` file in the `backend` folder:

```env
# Email Configuration
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-character-app-password-without-spaces

# Other variables...
mongo_uri=your-mongodb-uri
JWT_SECRET=your-jwt-secret
JWT_SELLER_SECRET=your-seller-jwt-secret
```

**IMPORTANT:**
- `EMAIL_USER` should be your full Gmail address
- `EMAIL_PASS` should be the **16-character app password** (no spaces!)
- Do NOT use your Gmail password - use the App Password
- Do NOT commit .env to version control

### Step 3: Verify Setup

Restart your backend server:

```bash
cd backend
npm start
```

You should see:
```
✅ Mail transporter verified successfully
```

Or a warning (which is fine - it will retry on first use):
```
⚠️ Mail transporter verification warning (will retry on first use)
```

### Step 4: Test Email Sending

1. Go to your app and try the **Forgot Password** feature
2. Enter your email
3. Check your inbox (and spam folder) for the reset email
4. Click the reset link

## Troubleshooting

### Error: "Email authentication failed"
**Solution:** Check that:
- `EMAIL_USER` is your full Gmail address
- `EMAIL_PASS` is a 16-character app password (not your Gmail password)
- There are no extra spaces in the credentials

### Error: "Network unreachable"
**Solution:**
- Check your internet connection
- Try restarting the backend server
- The error will automatically retry 3 times
- If still failing, check if your network blocks port 587

### Error: "Connection timed out"
**Solution:**
- Your firewall/network might block SMTP
- Contact your network administrator
- The system will automatically retry

### Email sends but goes to spam
**Solution:**
- Check your spam/junk folder
- If using a custom domain, ensure SPF/DKIM records are set up
- Gmail might require additional verification for sending

## What Changed

### New Features:
✅ Automatic retry (3 attempts with 2-second delays)
✅ Better timeout settings (10 seconds instead of 60)
✅ Connection pooling for better performance
✅ Rate limiting to prevent spam
✅ Non-blocking verification (server starts even if email fails)
✅ Detailed error logging for debugging
✅ Support for port 587 (STARTTLS) - more reliable

### Files Modified:
- `src/services/mail.services.js` → Updated SMTP configuration and retry logic

## Email Features in App

### Uses:
1. **Forgot Password** - Send password reset link
2. **Email Verification** (ready for future use)
3. **Order Confirmation** (ready for future use)
4. **Notifications** (ready for future use)

## Security Notes

🔒 Never commit `.env` file to Git
🔒 Use App Passwords, not your actual Gmail password
🔒 Keep `EMAIL_PASS` private and secure
🔒 Review connected apps in Gmail security settings periodically

## Support

If emails still don't work:
1. Check server logs for specific error messages
2. Verify .env variables are set correctly
3. Test with a valid Gmail account with 2FA enabled
4. Check Gmail [Less secure apps](https://myaccount.google.com/lesssecureapps) settings (may need to allow)

---

**Status:** ✅ Ready to use | **Last Updated:** March 8, 2026
