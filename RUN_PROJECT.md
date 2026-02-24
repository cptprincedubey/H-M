# 🚀 H&M E-Commerce Project - Quick Start Guide

## ✅ Project Status: READY TO RUN

Both backend and frontend servers are configured and ready to execute.

---

## 📍 Server Ports

| Service | Port | URL |
|---------|------|-----|
| Backend API | 5000 | `http://localhost:5000` |
| Frontend (Vite) | 5174 | `http://localhost:5174` |

---

## 🎯 How to Start the Project

### Option 1: Start Both Servers (Recommended)

**In Terminal 1 - Start Backend:**
```bash
cd backend
npm install
npm start
```

Expected output:
```
✅ Server is running on port 5000
📍 Health check: http://localhost:5000/api/health
💾 MongoDB connected successfully
```

**In Terminal 2 - Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
VITE v7.3.1 ready in 423 ms
➜ Local: http://localhost:5174/
```

---

## 🌐 Access the Application

### Frontend (User Side)
- **URL:** `http://localhost:5174/`
- **Pages Available:**
  - Home / Ladies / Men / Kids / Beauty (categories)
  - Product Details
  - Login / Register
  - Cart / Checkout
  - Favorites
  - Password Reset
  - Seller Dashboard

### Backend (API)
- **API Health Check:** `http://localhost:5000/api/health`
- **Main Routes:**
  - `/api/auth/user` - User authentication
  - `/api/auth/seller` - Seller authentication
  - `/api/products` - Products CRUD
  - `/api/cart` - Shopping cart
  - `/api/payment` - Payment processing
  - `/api/favorites` - Favorites management

---

## ✅ Verification Checklist

- [x] Backend listens on port 5000
- [x] Frontend runs on port 5174
- [x] MongoDB database connected
- [x] CORS configured for both ports
- [x] Environment variables loaded (.env)
- [x] All routes defined
- [x] All controllers working
- [x] Frontend build succeeds
- [x] AuthContext hook exported correctly
- [x] API endpoints responding

---

## 🔧 Troubleshooting

### If port is already in use:
```bash
# Change port in backend/.env
PORT=5001
```

Then update frontend config in `frontend/src/config/axiosInstance.jsx`:
```javascript
baseURL: "http://localhost:5001/api"
```

### If MongoDB connection fails:
- Ensure MongoDB connection string in `.env` is correct
- Check internet connection (required for MongoDB Atlas)

### If npm packages fail to install:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

---

## 📝 Key Configurations

### Backend (.env)
```
mongo_uri=mongodb+srv://cptprincedubey_db_user:l5iYdkkfkTUaArJ0@n23.t180pdy.mongodb.net/
PORT=5000
JWT_SECRET=fdjbfkjbvdskvjnhdsvodsnvdskjvb
JWT_SELLER_SECRET=bhvbvdskjbvdfnhejdbfudhfifjnsbchdsb
```

### Frontend API Configuration
- File: `frontend/src/config/axiosInstance.jsx`
- Base URL: `http://localhost:5000/api`

---

## 🎉 Your Project is Ready!

The H&M e-commerce application is fully configured and ready to execute.

**Start the servers and open:** `http://localhost:5174/`

Happy coding! 🚀
