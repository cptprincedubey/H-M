# 🧪 Quick Test Commands

## Quick Terminal Tests (Before Starting Servers)

### 1. Check Node Installation
```bash
node --version
npm --version
```

### 2. Check Backend Dependencies
```bash
cd c:\Users\cptpr\H-M-Final\backend
npm list express mongoose jsonwebtoken bcryptjs nodemailer
```

### 3. Check Frontend Dependencies
```bash
cd c:\Users\cptpr\H-M-Final\frontend
npm list react react-router-dom axios
```

---

## 🚀 Start the System

### Terminal 1 - Start Backend
```bash
cd c:\Users\cptpr\H-M-Final\backend
npm run dev
```

**Wait for**:
```
✅ Server is running on port 4500
```

### Terminal 2 - Start Frontend
```bash
cd c:\Users\cptpr\H-M-Final\frontend
npm run dev
```

**Wait for**:
```
➜  Local:   http://localhost:5173/
```

---

## 🧪 Test API Endpoints via Browser

### Test 1: Health Check
Open in browser or terminal:
```
http://localhost:4500/api/health
```

Expected response: `{"status":"OK"}`

### Test 2: Current User (Before Login)
```
http://localhost:4500/api/auth/user/me
```

Expected: `{"message":"Please login first"}` or similar

### Test 3: Via curl (Windows PowerShell)

#### Forgot Password Request
```powershell
$body = @{
    email = "test@example.com"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4500/api/auth/user/forgot-password" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

---

## 🎯 Manual Flow Testing in Browser

### Step 1: Visit Login Page
```
http://localhost:5173/login
```

✅ Check:
- [ ] Page loads without errors
- [ ] "Forgot Password?" link is visible
- [ ] No console errors (F12 → Console tab)

### Step 2: Test Forgot Password
1. Click "Forgot Password?" link
2. URL should change to `/forgot-password`
3. Enter an email address
4. Click "Send Reset Link"

✅ Check:
- [ ] Form submits without errors
- [ ] Success message appears
- [ ] Redirects to login page after 3 seconds
- [ ] Backend console shows email was sent (if configured)

### Step 3: Test Reset Password (if email works)
1. Check your email for reset link
2. Click the link in email
3. URL should be `/reset-password/:some_token_here`
4. Enter new password
5. Confirm password  
6. Click "Reset Password"

✅ Check:
- [ ] Form validates (passwords must match)
- [ ] Success message
- [ ] Can login with new password

### Step 4: Test Update Password (Logged-in)
1. Login with your account
2. Click account icon (top right header)
3. Click "Change Password"
4. URL should be `/update-password`
5. Enter current password
6. Enter new password
7. Confirm password
8. Click "Update Password"

✅ Check:
- [ ] Form validation works
- [ ] Success message
- [ ] Redirects to home page
- [ ] Can still login with new password

---

## 🔍 Error Testing

### Test Wrong Email (Forgot Password)
```
Email: nonexistent@example.com
Expected Error: "User not found"
```

### Test Expired Token (Reset Password)
```
1. Get reset link from email
2. Wait 2+ minutes
3. Click reset link
Expected Error: "Invalid or expired token"
```

### Test Non-Matching Passwords (Reset)
```
New Password: mypassword123
Confirm: different123
Expected Error: "Passwords do not match"
```

### Test Wrong Current Password (Update)
```
Current: wrongpassword
Expected Error: "Current password is incorrect"
```

### Test Unauthenticated Access
```
Visit: http://localhost:5173/update-password
Expected: Redirect to login page
```

---

## 🛠️ Debugging Commands

### Check Backend Logs
Look at the backend terminal (Terminal 1) for logs like:
```
POST /api/auth/user/forgot-password - 200
[Email Sent to: user@example.com]
```

### Check Frontend Console
Open browser DevTools (F12 → Console) for API call logs:
```
POST http://localhost:4500/api/auth/user/forgot-password 200
```

### Check Network Requests
In browser DevTools (F12 → Network tab):
1. Perform an action (forgot password, reset, etc)
2. Look for requests to `localhost:4500`
3. Check status codes (200 = success, 4xx = client error, 5xx = server error)
4. Click request → Response tab to see server response

---

## 📋 Complete Verification Checklist

### Before Testing
- [ ] .env file exists in `backend/` folder with EMAIL_USER and EMAIL_PASS
- [ ] Both `npm install` completed successfully
- [ ] No port conflicts (4500 and 5173 available)

### After Starting Servers
- [ ] Backend terminal shows "Server is running on port 4500"
- [ ] Frontend terminal shows "Local: http://localhost:5173/"
- [ ] No errors in either terminal
- [ ] Browser DevTools Console shows no errors

### Password Recovery Flow
- [ ] Visit login page → page loads ✅
- [ ] Click "Forgot Password?" → navigate to forgot-password page ✅
- [ ] Enter email → success message ✅
- [ ] (If email configured) Receive reset email ✅
- [ ] Click reset link → navigate to reset-password/:token ✅
- [ ] Reset password → success message ✅
- [ ] Login with new password → works ✅

### Header Account Menu
- [ ] Login with account ✅
- [ ] Click account name in header → dropdown shows ✅
- [ ] See user email in dropdown ✅
- [ ] See "Change Password" link ✅
- [ ] Click "Change Password" → navigate to update-password ✅

### Error Scenarios
- [ ] Wrong email → error message ✅
- [ ] Non-matching passwords → validation error ✅
- [ ] Expired token → error message ✅
- [ ] Unauthenticated update-password → redirect to login ✅

---

## 🔧 Troubleshooting

### Servers Won't Start

**Backend Error: "Port 4500 already in use"**
```bash
# Option 1: Kill process on port 4500
# Windows: Open Task Manager, find node process, end it
# OR
# Option 2: Use different port
# Edit .env and change PORT=5000
```

**Frontend Error: "Vite requires a higher version"**
```bash
cd frontend
npm install --save-dev vite@latest
```

**Frontend Error: Missing @vitejs/plugin-react**
```bash
cd frontend
npm install --save-dev @vitejs/plugin-react
```

### API Not Responding

**"Failed to fetch"**
1. Verify backend is running on port 4500
2. Check backend terminal for errors
3. Open http://localhost:4500/api/health in browser

**"Cannot POST /api/auth/user/forgot-password"**
1. Check routes are registered (grep "forgot-password" in backend/src/routes/auth.routes.js)
2. Restart backend server
3. Clear browser cache

### Email Not Sending

**"Service not available" / "ECONNREFUSED"**
1. Check .env has EMAIL_USER and EMAIL_PASS
2. Verify Gmail credentials are correct
3. Confirm 2-Factor Authentication is enabled on Gmail account
4. Get new app password from https://myaccount.google.com/apppasswords

**Email arrives late or not at all**
1. Check SPAM folder
2. Verify sent from correct email (should be your Gmail)
3. Check backend logs for success messages

### Form Validation Not Working

**Form submits without errors**
1. Check browser Console (F12) for JavaScript errors
2. Verify form input names match API expectations
3. Check axiosInstance is properly configured

---

## 📊 Expected Response Codes

```
200 OK - Request successful
201 Created - Resource created
400 Bad Request - Invalid email/password
401 Unauthorized - Not logged in
404 Not Found - User/token not found
500 Internal Server Error - Backend error
```

---

## ✨ Success Indicators

### System is working correctly when:
1. ✅ Both servers start without errors
2. ✅ Frontend pages load and respond
3. ✅ All form submissions work
4. ✅ API endpoints return responses
5. ✅ Error messages appear when appropriate
6. ✅ Emails send (if configured)
7. ✅ New passwords work after reset

---

## 🎯 Final Steps

1. Start both servers
2. Run through the manual flow tests above
3. Check all items in the verification checklist
4. If all green ✅, the system is working!

**Happy testing!** 🎉

