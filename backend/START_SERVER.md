# How to Start the Backend Server

## Quick Start

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Check your .env file:**
   Make sure your `.env` file has:
   ```env
   PORT=4500
   mongo_uri=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_SELLER_SECRET=your_seller_jwt_secret
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   ✅ MongoDB connected successfully
   ✅ Server is running on port 4500
   📍 Health check: http://localhost:4500/api/health
   🔗 API Base URL: http://localhost:4500/api
   ```

## Troubleshooting

### Port Already in Use

If you see: `Error: Port 4500 is already in use!`

**Solution 1:** Find and stop the process using port 4500
```bash
# Windows PowerShell
netstat -ano | findstr :4500
taskkill /PID <PID> /F

# Or change PORT in .env to a different port (e.g., 4501)
```

**Solution 2:** Change the port in `.env` file
```env
PORT=4501
```
Then update frontend `axiosInstance.jsx` to use the new port.

### MongoDB Connection Error

If you see: `Error connecting to MongoDB`

1. Check your MongoDB connection string in `.env`
2. Make sure MongoDB is running (if local) or accessible (if cloud)
3. Verify the connection string format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database
   ```

### Server Won't Start

1. Check if Node.js is installed: `node --version`
2. Check if all dependencies are installed: `npm install`
3. Check for syntax errors in `server.js`
4. Verify `.env` file exists and has correct values

## Testing the Server

Once the server is running, test it:

1. **Health Check:**
   Open browser: `http://localhost:4500/api/health`
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Root Endpoint:**
   Open browser: `http://localhost:4500/`
   Should show API information

## Default Port

The server runs on **port 4500** by default, which matches the frontend configuration.
