const UserModel = require("../models/user.model");
const ProductModel = require("../models/product.model");

// Add to favorites
const addToFavoritesController = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({
        status: false,
        message: "User ID and Product ID are required",
      });
    }

    // Find the product
    const product = await ProductModel.findById(product_id);
    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    // Find the user
    const user = await UserModel.findById(user_id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Check if already in favorites
    const isFavorite = user.favorites.some(
      (fav) => fav.product_id.toString() === product_id
    );

    if (isFavorite) {
      return res.status(400).json({
        status: false,
        message: "Product already in favorites",
      });
    }

    // Add to favorites
    user.favorites.push({
      product_id,
      productName: product.productName,
      price: product.price.amount,
      images: product.images,
      category: product.category,
    });

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Added to favorites successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error in addToFavoritesController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Remove from favorites
const removeFromFavoritesController = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({
        status: false,
        message: "User ID and Product ID are required",
      });
    }

    const user = await UserModel.findById(user_id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    user.favorites = user.favorites.filter(
      (fav) => fav.product_id.toString() !== product_id
    );

    await user.save();

    return res.status(200).json({
      status: true,
      message: "Removed from favorites successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error in removeFromFavoritesController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get favorites
const getFavoritesController = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const user = await UserModel.findById(user_id).populate("favorites.product_id");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Favorites fetched successfully",
      favorites: user.favorites || [],
    });
  } catch (error) {
    console.error("Error in getFavoritesController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addToFavoritesController,
  removeFromFavoritesController,
  getFavoritesController,
};
