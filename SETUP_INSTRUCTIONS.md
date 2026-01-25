# Setup and Run Instructions

## Quick Start

### 1. Start Backend Server

Open Terminal 1:
```bash
cd backend
npm install  # If you haven't already
npm start
```

You should see: `server is running on port 4500`

### 2. Start Frontend Server

Open Terminal 2:
```bash
cd frontend
npm install  # If you haven't already
npm run dev
```

You should see: `VITE v7.x.x ready in XXX ms` and the URL `http://localhost:5173`

### 3. Verify Backend is Running

Open your browser and go to: `http://localhost:4500/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "..."
}
```

## Troubleshooting

### Network Errors

If you see "Network Error" or "Error loading products":

1. **Check if backend is running:**
   - Go to `http://localhost:4500/api/health`
   - If you get an error, the backend is not running

2. **Check MongoDB connection:**
   - Make sure MongoDB is running
   - Check your `.env` file in the `backend` folder
   - Verify `mongo_uri` is correct

3. **Check CORS:**
   - Backend CORS is configured for `http://localhost:5173`
   - Make sure frontend is running on port 5173

4. **Check browser console:**
   - Open browser DevTools (F12)
   - Check the Console tab for detailed error messages
   - Check the Network tab to see if API calls are failing

### Common Issues

**Issue: "Cannot connect to backend"**
- Solution: Make sure backend server is running on port 4500
- Check if port 4500 is already in use

**Issue: "MongoDB connection error"**
- Solution: Check your MongoDB connection string in `.env`
- Make sure MongoDB service is running

**Issue: "Products not loading"**
- Solution: Make sure you have products in your database
- Check the category name matches exactly (ladies, men, kids, beauty, home)

## Testing the Application

1. **Home Page:** `http://localhost:5173/home`
2. **Ladies:** `http://localhost:5173/`
3. **Men:** `http://localhost:5173/men`
4. **Kids:** `http://localhost:5173/kids`
5. **Beauty:** `http://localhost:5173/beauty`
6. **Login:** `http://localhost:5173/login`
7. **Register:** `http://localhost:5173/register`

## Environment Variables

Make sure your `backend/.env` file has:
```env
mongo_uri=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_SELLER_SECRET=your_seller_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL=your_imagekit_url
port=4500
NODE_ENV=development
```

## All Fixed Issues

✅ React Router imports fixed (react-router-dom → react-router)
✅ API error handling improved
✅ Backend returns empty array instead of 404 for no products
✅ Better error messages in frontend
✅ Network error handling
✅ Loading states on all pages
✅ Health check endpoint added
