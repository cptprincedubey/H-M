# Authentication Quick Reference

## 🔐 Authentication System Overview

Your H&M e-commerce platform now has a complete, secure authentication system with proper error handling and non-blocking operations.

---

## 📝 User Workflows

### Register New User
```
1. Go to /register
2. Enter: Name, Email, Phone, Password (min 6 chars)
3. System validates all fields
4. User created with hashed password
5. Auto login + redirect to home
```

### Login
```
1. Go to /login
2. Enter: Email, Password
3. System validates credentials
4. Session created (7-day cookie)
5. User stored in localStorage
6. Redirect to home
```

### Forgot Password
```
1. Go to /forgot-password
2. Enter email address
3. Check email for reset link (link valid 2 minutes)
4. Click link (redirects to /reset-password/:token)
5. Enter new password
6. Password updated, redirect to login
```

### Update Password (Logged In)
```
1. Go to /update-password (auto redirects if not logged in)
2. Enter: Current password, New password, Confirm
3. System validates and updates
4. Confirmation email sent
5. Redirect to home
```

---

## 🛡️ Security Features

| Feature | Status |
|---------|--------|
| Password Hashing | ✅ bcrypt with salt 10 |
| JWT Tokens | ✅ 7 day expiration |
| HTTP-Only Cookies | ✅ Enabled |
| CSRF Protection | ✅ sameSite: lax |
| Password Exposure | ✅ Never in responses |
| Enum Prevention | ✅ Generic error messages |
| Email Validation | ✅ Middleware validation |
| Token Verification | ✅ JWT + DB check |

---

## 🚨 Error Messages

### User Friendly:
- "Invalid email or password" (login fail)
- "Email already registered" (duplicate email)
- "All fields are required" (missing input)
- "Passwords do not match" (mismatch)
- "Invalid or expired reset token" (expired link)

### Technical (Console):
- Detailed errors logged for debugging
- Not exposed to frontend users
- Helps with troubleshooting

---

## 🔄 Session Management

### Automatic:
- ✅ Token valid for 7 days
- ✅ Stored in HTTP-only cookie
- ✅ Also stored in localStorage
- ✅ Persists across page refreshes
- ✅ Auto-verified on protected routes

### Logout:
- ✅ Clear cookie
- ✅ Clear localStorage
- ✅ Clear AuthContext
- ✅ Redirect to home (or login)

---

## 📧 Email Features

### When Emails Are Sent:
1. **Forgot Password** → Reset link (2-minute expiry)
2. **Reset Password Success** → Confirmation email
3. **Update Password Success** → Confirmation email
4. **Registration** → (Optional welcome email)

### Email Safety:
- ✅ Non-blocking (doesn't freeze UI)
- ✅ Errors logged but don't fail request
- ✅ User succeeds even if email fails
- ✅ Links include full URL for email clients

---

## 🔌 API Endpoints

### Public Endpoints:
```
POST /auth/user/register
POST /auth/user/login
POST /auth/user/logout
POST /auth/user/forgot-password
POST /auth/user/reset-password/:token
```

### Protected Endpoints:
```
POST /auth/user/update-password (requires auth)
GET /auth/user/me (requires auth)
```

---

## 📱 Frontend State Management

### AuthContext stores:
```javascript
{
  user: {
    _id: "...",
    name: "...",
    email: "...",
    phone: "...",
    // Note: password NEVER included
  },
  setUser: function
}
```

### localStorage stores:
```
"user" → JSON stringified user object
"searchHistory" → Last 5 searches
```

---

## ⚠️ Common Issues & Solutions

### Issue: "Token not found"
**Cause**: User logged out but page requires auth
**Solution**: Redirect to login page automatically

### Issue: "Invalid email or password"
**Cause**: Wrong email OR wrong password
**Solution**: User can try login again or use forgot password

### Issue: Reset link expired
**Cause**: Link older than 2 minutes
**Solution**: Request new reset link from forgot password

### Issue: Email not received
**Cause**: Email service might be slow/down
**Solution**: Request new link or check spam folder

### Issue: Passwords don't match
**Cause**: Typo or caps lock on
**Solution**: Clear and re-enter passwords

---

## 🧪 Testing Authentication

### Test Registration:
```
Email: test@example.com
Password: password123
Expected: New account created, logged in auto
```

### Test Login:
```
Email: (registered email)
Password: (correct password)
Expected: Session starts, redirected to home
```

### Test Password Reset:
```
1. Forgot password with registered email
2. Check email for reset link
3. Click link, enter new password
4. Login with new password
Expected: Success, can login with new password
```

### Test Session:
```
1. Login
2. Close app/browser
3. Reopen
4. Check if user still logged in
Expected: Yes, user persists via localStorage + cookies
```

---

## 📊 Token Details

```javascript
JWT Payload:
{
  id: user._id,
  iat: issued_at_timestamp,
  exp: expiring_at_timestamp
}

Token stored in:
1. HTTP-Only Cookie (secure, browser auto-sends)
2. localStorage (for manual axios setup)
```

---

## 🎯 Best Practices

✅ **DO:**
- Use strong passwords (8+ chars, mix case, numbers)
- Update password periodically
- Use forgot password if you forget
- Logout from public computers
- Never share reset links

❌ **DON'T:**
- Save passwords in browser (insecure)
- Use same password as other sites
- Share authentication tokens
- Stay logged in on public devices
- Click suspicious password reset links

---

## 🚀 Production Checklist

- ✅ Passwords hashed with bcrypt
- ✅ Tokens have proper expiration
- ✅ HTTP-Only cookies enabled
- ✅ HTTPS enforced (in production)
- ✅ Error messages safe for users
- ✅ Email service configured
- ✅ Middleware properly applied
- ✅ All routes validated
- ✅ No sensitive data in responses
- ✅ Logging configured for debugging

---

## 📞 If You Need Help

### Check:
1. Backend running on port 5000? ✓
2. Frontend running on port 5174? ✓
3. MongoDB connected? ✓
4. Email service configured? ✓
5. .env file has JWT_SECRET? ✓

### Troubleshoot:
- Check server logs for errors
- Check browser console for client errors
- Verify email sending in logs
- Test API endpoints with curl
- Check browser cookies/localStorage

---

## 📈 Current Status

| Component | Status |
|-----------|--------|
| Registration | ✅ Working |
| Login | ✅ Working |
| Logout | ✅ Working |
| Password Reset | ✅ Working |
| Password Update | ✅ Working |
| Session Persistence | ✅ Working |
| Email Service | ✅ Working |
| Error Handling | ✅ Improved |
| Security | ✅ Enhanced |

**Overall Status: ✅ FULLY OPERATIONAL**

