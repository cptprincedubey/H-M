const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

// Add to cart
const addToCartController = async (req, res) => {
  try {
    const { user_id, product_id, quantity, size, color } = req.body;

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

    // Find or create cart
    let cart = await CartModel.findOne({ user_id });
    if (!cart) {
      cart = new CartModel({ user_id, items: [] });
    }

    // Check if product already in cart
    const existingItem = cart.items.find(
      (item) => item.product_id.toString() === product_id && item.size === size && item.color === color
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        product_id,
        productName: product.productName,
        price: product.price.amount,
        quantity: quantity || 1,
        size: size || "M",
        color: color || (product.colors?.[0] || "Black"),
        images: product.images || [],
      });
    }

    await cart.save();

    // Recalculate totals
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error in addToCartController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get cart
const getCartController = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    const cart = await CartModel.findOne({ user_id }).populate("items.product_id");

    if (!cart) {
      return res.status(200).json({
        status: true,
        message: "Cart is empty",
        cart: { user_id, items: [], totalAmount: 0, totalQuantity: 0 },
      });
    }

    // Ensure totals are calculated
    cart.totalAmount = cart.items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
    cart.totalQuantity = cart.items.reduce((total, item) => total + (item.quantity || 1), 0);

    return res.status(200).json({
      status: true,
      message: "Cart fetched successfully",
      cart,
    });
  } catch (error) {
    console.error("Error in getCartController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update cart item quantity
const updateCartItemController = async (req, res) => {
  try {
    const { user_id, product_id, quantity, size, color } = req.body;

    if (!user_id || !product_id || quantity < 0) {
      return res.status(400).json({
        status: false,
        message: "Invalid parameters",
      });
    }

    const cart = await CartModel.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (i) => i.product_id.toString() === product_id && i.size === size && i.color === color
    );

    if (!item) {
      return res.status(404).json({
        status: false,
        message: "Item not found in cart",
      });
    }

    if (quantity === 0) {
      cart.items = cart.items.filter((i) => i !== item);
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    // Recalculate totals
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Error in updateCartItemController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Remove from cart
const removeFromCartController = async (req, res) => {
  try {
    const { user_id, product_id, size, color } = req.body;

    if (!user_id || !product_id) {
      return res.status(400).json({
        status: false,
        message: "User ID and Product ID are required",
      });
    }

    const cart = await CartModel.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => !(item.product_id.toString() === product_id && item.size === size && item.color === color)
    );

    // Recalculate totals
    cart.totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);
    await cart.save();

    return res.status(200).json({
      status: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Error in removeFromCartController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Clear cart
const clearCartController = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        status: false,
        message: "User ID is required",
      });
    }

    await CartModel.findOneAndUpdate(
      { user_id },
      { items: [], totalAmount: 0, totalQuantity: 0 },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Error in clearCartController:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
};
