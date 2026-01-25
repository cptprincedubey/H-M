require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");
const sellerAuthRoutes = require("./src/routes/seller.Auth.routes");
const paymentRoutes = require("./src/routes/payment.routes");

const connectDB = require("./src/config/db");
const cookieParser = require("cookie-parser");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

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
      payment: "/api/payment"
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
