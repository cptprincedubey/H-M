# Quick Start Guide

## ✅ Backend Server Configuration Fixed!

The server is now configured to run on **port 4500** which matches your frontend.

## 🚀 Start the Server

### Option 1: Using npm (Recommended)
```bash
cd backend
npm start
```

### Option 2: Direct Node
```bash
cd backend
node server.js
```

## ✅ What You Should See

When the server starts successfully, you'll see:
```
✅ MongoDB connected successfully
✅ Server is running on port 4500
📍 Health check: http://localhost:4500/api/health
🔗 API Base URL: http://localhost:4500/api
```

## 🔍 Verify Server is Running

1. **Check Health Endpoint:**
   Open in browser: `http://localhost:4500/api/health`
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Check Root Endpoint:**
   Open in browser: `http://localhost:4500/`
   Should show API information

## ⚠️ Common Issues

### Port Already in Use
If you see: `Error: Port 4500 is already in use!`

**Windows PowerShell:**
```powershell
# Find process using port 4500
netstat -ano | findstr :4500

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

**Or change port in .env:**
```env
PORT=4501
```
(Then update frontend axiosInstance.jsx baseURL)

### MongoDB Connection Error
- Check your `mongo_uri` in `.env` file
- Make sure MongoDB Atlas cluster is running
- Verify connection string is correct

## 📝 Current Configuration

- **Port:** 4500 (matches frontend)
- **Frontend URL:** http://localhost:5173
- **Backend URL:** http://localhost:4500
- **API Base:** http://localhost:4500/api

## 🎯 Next Steps

1. Start backend: `cd backend && npm start`
2. Start frontend: `cd frontend && npm run dev`
3. Test authentication at: `http://localhost:5173/login`

Everything is configured correctly! 🎉
