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

connectDB();

app.use("/api/auth/user", authRoutes);
app.use("/api/auth/seller", sellerAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);

let port = process.env.port || 4500;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
