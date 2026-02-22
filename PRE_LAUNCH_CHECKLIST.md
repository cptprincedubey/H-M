# ✅ Pre-Launch Verification Checklist

## Before Starting Servers

### 1. Environment Setup
- [ ] Navigate to `backend/` folder
- [ ] Verify `.env` file exists
- [ ] Verify `.env` contains these keys:
  - `EMAIL_USER=your_gmail@gmail.com`
  - `EMAIL_PASS=xxxx xxxx xxxx xxxx` (16-character app password)
  - `JWT_SECRET=any_strong_secret_here`
  - `MONGODB_URI=mongodb://connection_string`
  - `FRONTEND_URL=http://localhost:5173`
  - `PORT=4500`

### 2. Dependencies Check
```bash
# Backend
cd backend
npm list express mongoose jsonwebtoken bcryptjs nodemailer joi

# Frontend  
cd frontend
npm list react react-router-dom axios
```
All should show `✓` with version numbers

### 3. File Structure Verification
Confirm these files exist:

**Backend Files:**
- [ ] `backend/src/models/user.model.js` (With resetToken fields)
- [ ] `backend/src/controllers/auth.controller.js` (With password functions)
- [ ] `backend/src/routes/auth.routes.js` (With password routes)
- [ ] `backend/src/services/mail.services.js` (Email config)
- [ ] `backend/server.js` (Main server)

**Frontend Files:**
- [ ] `frontend/src/pages/Login.jsx` (Has "Forgot Password?" link)
- [ ] `frontend/src/pages/Header.jsx` (Has account dropdown)
- [ ] `frontend/src/pages/ForgotPassword.jsx` (Email form)
- [ ] `frontend/src/pages/ResetPassword.jsx` (Reset form)
- [ ] `frontend/src/pages/UpdatePassword.jsx` (Update form)
- [ ] `frontend/src/router/AppRouter.jsx` (Has 3 new routes)

### 4. Port Availability
```bash
# Check if ports are free
Windows (PowerShell):
netstat -ano | findstr :4500
netstat -ano | findstr :5173

# If ports in use, stop processes or change PORT in .env
```

### 5. Configuration Validation
- [ ] .env file properly formatted (KEY=VALUE)
- [ ] No quotes around values (unless required)
- [ ] No extra spaces around = sign
- [ ] Email credentials are accurate
- [ ] MongoDB connection string is correct

---

## Startup Process

### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```

**Wait for this output:**
```
✅ Server is running on port 4500
```

**Do NOT proceed to Terminal 2 until this appears**

### Terminal 2 - Start Frontend  
```bash
cd frontend
npm run dev
```

**Wait for this output:**
```
➜  Local:   http://localhost:5173/
```

---

## Post-Startup Verification

### Browser Tests (Open each in browser)

1. **Health Check**
   ```
   http://localhost:4500/api/health
   ```
   Expected: Page shows JSON response

2. **Frontend Home**
   ```
   http://localhost:5173/
   ```
   Expected: Homepage loads without errors

3. **Login Page**
   ```
   http://localhost:5173/login
   ```
   Expected: Login form with "Forgot Password?" link visible

4. **Browser Console Check**
   - Press F12 to open DevTools
   - Click "Console" tab
   - Check for any red error messages
   - Expected: No errors related to the password system

### Node Terminal Checks

**Backend Terminal (where you ran `npm run dev`)**
- [ ] No red error messages
- [ ] No "Cannot find module" errors
- [ ] Port 4500 is listening

**Frontend Terminal**
- [ ] No bundling errors
- [ ] Shows "Local: http://localhost:5173/"
- [ ] Shows "Network: ..."

---

## Functionality Quick Tests

### Test 1: Forgot Password Page
1. Go to `http://localhost:5173/forgot-password`
2. Page should load with email input form
3. No console errors
4. Form should be responsive

### Test 2: Login with Forgot Password Link
1. Go to `http://localhost:5173/login`
2. Look for "Forgot Password?" link
3. Click it
4. Should navigate to `/forgot-password` page

### Test 3: Header Account Menu
1. The page should show without errors
2. Look at top right for account icon/button
3. Should be able to interact with header components

### Test 4: Update Password Access
1. Visit `http://localhost:5173/update-password` WITHOUT logging in
2. Should redirect to `/login` page
3. This confirms authentication check is working

---

## Email Configuration Verification

### Gmail Setup Steps (if testing email)
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer"
3. Get 16-character app password
4. Copy to EMAIL_PASS in .env exactly (with spaces)
5. Restart backend server

### Email Test
```bash
# In backend folder, create test file:
# test-email.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'your_email@example.com',
  subject: 'Test Email',
  html: '<h1>Test Email</h1><p>If you see this, email is working!</p>'
}, (error, info) => {
  if (error) console.error('Email Error:', error);
  else console.log('Email sent:', info.response);
});
```

Then run:
```bash
node test-email.js
```

---

## Troubleshooting During Startup

### If Backend Won't Start

**Error: "Port 4500 already in use"**
```bash
# Solution 1: Kill the process
taskkill /PID [process_id] /F

# Solution 2: Use different port
# Edit .env: PORT=5000
# Restart backend
```

**Error: "Cannot find module 'express'"**
```bash
cd backend
npm install
npm run dev
```

**Error: "Unexpected token in JSON"**
- Check .env file formatting
- Ensure no trailing spaces
- Remove quotes around values

### If Frontend Won't Start

**Error: "Vite requires Node >=..."**
```bash
node --version
# Update Node if needed
```

**Error: "Missing @vitejs/plugin-react"**
```bash
cd frontend
npm install
npm run dev
```

### If Pages Won't Load

1. Check backend terminal for errors
2. Check browser console (F12)
3. Check network tab shows requests to `localhost:4500`
4. Verify `.env` has `FRONTEND_URL=http://localhost:5173`

---

## Common Status Indicators

### ✅ Everything is Working
- Both terminals show no errors
- Browser pages load without errors
- F12 Console has no error messages
- Can click links and navigate pages

### ⚠️ Check Configuration
- See "EMAIL_USER not set" error
- See "MONGODB_URI not defined" error
- See "Cannot POST /api/..." errors

### 🔴 Fix Immediately
- See "Port already in use"
- See "Cannot find module" errors
- See "Unexpected token" errors
- Page shows blank white screen

---

## Success Indicators

You'll know the system is ready when:

1. **Backend Terminal** shows:
   ```
   ✅ Server is running on port 4500
   ```

2. **Frontend Terminal** shows:
   ```
   ➜  Local:   http://localhost:5173/
   ```

3. **Browser Console** (F12) shows:
   - No error messages
   - Clear loading and render logs

4. **Pages Load** without:
   - Blank white screens
   - Unresponsive components
   - 404 errors
   - Network failures

5. **Interactions Work** like:
   - Clicking links navigates
   - Buttons respond to clicks
   - Forms appear interactive
   - No JavaScript errors

---

## What to Do If Something Fails

**Step 1: Check Errors**
- [ ] Backend terminal for error messages
- [ ] Frontend terminal for bundling errors
- [ ] Browser console (F12) for JavaScript errors
- [ ] Browser network tab (F12) for failed API calls

**Step 2: Verify Configuration**
- [ ] .env file exists in backend folder
- [ ] All required .env variables are set
- [ ] No typos in EMAIL_USER or other keys
- [ ] Ports 4500 and 5173 are available

**Step 3: Restart Services**
```bash
# Kill terminal processes (Ctrl+C in each)
# Restart:
# Terminal 1: cd backend && npm run dev
# Terminal 2: cd frontend && npm run dev
```

**Step 4: Clear Cache**
```bash
# Backend
cd backend
rm -r node_modules package-lock.json
npm install
npm run dev

# Frontend
cd frontend
rm -r node_modules package-lock.json  
npm install
npm run dev
```

**Step 5: Check Logs**
- Post Terminal 1 output entirely in issue/bug report
- Post Terminal 2 output entirely
- Post browser console (F12) errors
- Post exact error messages

---

## Ready to Launch?

Use this checklist:

### Critical Items (Must Have)
- [ ] .env file created with EMAIL_USER and EMAIL_PASS
- [ ] `npm install` completed in both folders
- [ ] Ports 4500 and 5173 are available
- [ ] Both folders have node_modules

### Recommended Items (Should Have)
- [ ] Tested email configuration
- [ ] Verified all required files exist
- [ ] Cleared browser cache
- [ ] Closed other apps using same ports

### Final Check
- [ ] Read entire checklist again
- [ ] Verified all "Critical Items"
- [ ] Ready to follow startup process above

---

## You're Ready When...

✅ You've checked all critical items  
✅ You understand the startup process  
✅ You know how to check for errors  
✅ You have the troubleshooting steps saved  

**→ PROCEED TO STARTUP PROCESS ABOVE**

---

## After Everything Works

Once servers are running successfully:

1. Open browser to `http://localhost:5173/login`
2. Test the password recovery flow
3. Check TEST_COMMANDS.md for full testing checklist
4. Report any issues or unexpected behavior

---

**This checklist ensures nothing goes wrong. Follow it step by step!**

**Questions? Check TEST_COMMANDS.md or IMPLEMENTATION_COMPLETE.md**

