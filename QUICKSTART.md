# Password Recovery System - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Configure Email (Gmail)

1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and your device
3. Copy the 16-character app password
4. Create `backend/.env` file:

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_uri
PORT=4500
NODE_ENV=development
```

### Step 2: Start Servers

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

### Step 3: Test the Flow

1. Open http://localhost:5173/login
2. Click "Forgot Password?"
3. Enter your registered email
4. Check email for reset link
5. Click link and reset password
6. Login with new password

## 📝 Features at a Glance

| Feature | Path | User Type |
|---------|------|-----------|
| **Forgot Password** | /forgot-password | Guest |
| **Reset Password** | /reset-password/:token | Guest |
| **Update Password** | /update-password | Logged-in |
| **Account Menu** | Header Account Button | Logged-in |

## 🔑 Key Information

- **Reset Link Duration**: 2 minutes
- **Password Min Length**: 6 characters
- **Email Service**: Nodemailer (Gmail)
- **Database Fields**: resetToken, resetTokenExpire

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Email not sending | Check .env EMAIL_USER and EMAIL_PASS |
| "Unknown user" error | Use registered email address |
| Reset link expired | Request new link (expires in 2 min) |
| Token invalid error | Use fresh reset link from email |
| Can't login | Password changed? Try reset flow |

## 📧 Email Setup Verification

```bash
# Test with curl (optional)
curl -X POST http://localhost:4500/api/auth/user/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"your_email@gmail.com"}'
```

## 🎯 API Endpoints

```
POST /api/auth/user/forgot-password
POST /api/auth/user/reset-password/:token
POST /api/auth/user/update-password
```

## 📱 UI Locations

- **Forgot Password Link**: Login page, below password field
- **Change Password**: Header account dropdown (when logged in)
- **Reset Form**: Auto-accessed from email link

## 🔒 Security Checklist

✅ Token expires in 2 minutes
✅ Passwords hashed with bcrypt
✅ Email-verified password reset
✅ Secure token storage in callback
✅ CORS enabled for frontend origin

## 📞 Quick Help

**Still not working?**
1. Check browser console for errors
2. Check backend terminal for logs
3. Verify all .env variables set
4. Ensure MongoDB is running
5. Clear browser cache and retry

## 🚀 What's Included

- ✅ 3 new frontend pages (Forgot, Reset, Update Password)
- ✅ 3 new API endpoints
- ✅ User model updates
- ✅ Email template designs
- ✅ Header account menu
- ✅ Full error handling
- ✅ Toast notifications
- ✅ Mobile responsive UI

## 📚 Full Documentation

For detailed setup, troubleshooting, and production deployment:
See `PASSWORD_RECOVERY_SETUP.md`

---

**Ready to test?** → Start servers and go to http://localhost:5173/login
