const express = require("express");
const {
  addToFavoritesController,
  removeFromFavoritesController,
  getFavoritesController,
} = require("../controllers/favorites.controller");

const router = express.Router();

// Add to favorites
router.post("/add", addToFavoritesController);

// Get favorites
router.get("/:user_id", getFavoritesController);

// Remove from favorites
router.delete("/remove", removeFromFavoritesController);

module.exports = router;
