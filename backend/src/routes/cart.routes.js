const express = require("express");
const {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} = require("../controllers/cart.controller");

const router = express.Router();

// Add to cart
router.post("/add", addToCartController);

// Get cart
router.get("/:user_id", getCartController);

// Update cart item
router.put("/update", updateCartItemController);

// Remove from cart
router.delete("/remove", removeFromCartController);

// Clear cart
router.delete("/clear", clearCartController);

module.exports = router;
