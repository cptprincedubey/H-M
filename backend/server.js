require("dotenv").config({ path: require("path").join(__dirname, ".env") });
console.log("Loaded .env from", require("path").join(__dirname, ".env"));
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");
const sellerAuthRoutes = require("./src/routes/seller.Auth.routes");
const paymentRoutes = require("./src/routes/payment.routes");
const cartRoutes = require("./src/routes/cart.routes");
const favoritesRoutes = require("./src/routes/favorites.routes");
const searchRoutes = require("./src/routes/search.routes");

const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const app = express();
// allow origins to be configured via environment so the app works both
// locally and when deployed.  Render will set FRONTEND_URL (or you can add
// the URL yourself) and we keep the localhost versions for development.
// Support multiple frontend URLs: production + development
const allowedOrigins = [
  ...((process.env.FRONTEND_URL || "").split(",").map((url) => url.trim())),
  "https://h-m-611n.vercel.app/",
  "https://h-m-611n.vercel.app",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
].filter(Boolean);

console.log("📋 Allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(cookieParser());

// Ensure uploads folder exists and serve it statically (used as ImageKit fallback)
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

app.use(express.json());

// Connect to database
connectDB();

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "H&M E-Commerce API",
    status: "running",
    endpoints: {
      health: "/api/health",
      auth: {
        user: "/api/auth/user",
        seller: "/api/auth/seller"
      },
      products: "/api/products",
      payment: "/api/payment",
      cart: "/api/cart",
      favorites: "/api/favorites"
    }
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth/user", authRoutes);
app.use("/api/auth/seller", sellerAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/search", searchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Get port from environment variable (uppercase PORT or lowercase port)
let port = parseInt(process.env.PORT || process.env.port, 10) || 4500;

// log missing critical environment variables early
const requiredEnvs = [
  'mongo_uri',
  'JWT_SECRET',
  'JWT_SELLER_SECRET',
  'EMAIL_USER',
  'EMAIL_PASS',
];
requiredEnvs.forEach((name) => {
  if (!process.env[name]) {
    console.warn(`⚠️ Environment variable ${name} is not set`);
  }
});

// Check critical variables and exit if missing
const mongoUri = process.env.mongo_uri || process.env.MONGO_URI || process.env.DATABASE_URL;
if (!mongoUri) {
  console.error('❌ CRITICAL: MongoDB URI not found. Set mongo_uri, MONGO_URI, or DATABASE_URL in environment variables.');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('❌ CRITICAL: JWT_SECRET not set. Required for authentication.');
  process.exit(1);
}
if (!process.env.JWT_SELLER_SECRET) {
  console.error('❌ CRITICAL: JWT_SELLER_SECRET not set. Required for seller authentication.');
  process.exit(1);
}

// helper to start server and automatically try next port on conflict
const startServer = (startPort, attempts = 0) => {
  const server = app.listen(startPort, () => {
    console.log(`\n✅ Server is running on port ${startPort}`);
    // export actual port for other modules (e.g. storage URL generator)
    process.env.ACTUAL_PORT = startPort;
    console.log(`📍 Health check: http://localhost:${startPort}/api/health`);
    console.log(`🔗 API Base URL: http://localhost:${startPort}/api\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempts < 5) {
      console.warn(`\n⚠️ Port ${startPort} is already in use, trying ${startPort + 1}`);
      startServer(startPort + 1, attempts + 1);
    } else {
      console.error('Server failed to start:', err);
      process.exit(1);
    }
  });
};

// Start the server with automatic port fallback
startServer(port);
