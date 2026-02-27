require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");
const sellerAuthRoutes = require("./src/routes/seller.Auth.routes");
const paymentRoutes = require("./src/routes/payment.routes");
const cartRoutes = require("./src/routes/cart.routes");
const favoritesRoutes = require("./src/routes/favorites.routes");

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
  "http://localhost:5173",
  "http://localhost:5174",
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Get port from environment variable (uppercase PORT or lowercase port)
const port = process.env.PORT || process.env.port || 4500;

// Start server
app.listen(port, () => {
  console.log(`\n✅ Server is running on port ${port}`);
  console.log(`📍 Health check: http://localhost:${port}/api/health`);
  console.log(`🔗 API Base URL: http://localhost:${port}/api\n`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${port} is already in use!`);
    console.error(`   Please either:`);
    console.error(`   1. Stop the process using port ${port}`);
    console.error(`   2. Change the PORT in .env file to a different port\n`);
  } else {
    console.error(`\n❌ Server error:`, err);
  }
  process.exit(1);
});
