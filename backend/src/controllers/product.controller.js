const ProductModel = require("../models/product.model");
const sendFiles = require("../services/storage.services");

const createProductController = async (req, res) => {
  try {
    let seller_id = req.seller._id;

    if (!req.files || req.files.length === 0)
      return res.status(422).json({
        message: "Images is required",
      });

    const uploadedImgs = await Promise.all(
      req.files.map(
        async (val) => await sendFiles(val.buffer, val.originalname)
      )
    );

    console.log("uploaded img ->", uploadedImgs);

    let { productName, amount, description, currency, size, color, category } = req.body;

    if (!productName || !amount || !description || !currency || !color || !size || !category) {
      return res.status(422).json({ message: "All fields are required" });
    }

    // Normalize and convert size and color to arrays
    const sizesArray = Array.isArray(size)
      ? size.map(s => String(s).trim().toLowerCase())
      : String(size).split(',').map(s => s.trim().toLowerCase());
    const colorsArray = Array.isArray(color)
      ? color.map(c => String(c).trim())
      : String(color).split(',').map(c => c.trim());

    // Normalize category to lowercase (model expects lowercase enums)
    const categoryNorm = String(category).trim().toLowerCase();

    let newProduct = await ProductModel.create({
      productName: String(productName).trim(),
      price: {
        amount: Number(amount),
        currency: String(currency).trim(),
      },
      category: categoryNorm,
      description: String(description).trim(),
      colors: colorsArray,
      sizes: sizesArray,
      images: uploadedImgs.map((val) => val.url),
      seller_id: seller_id,
    });

    return res.status(201).json({
      message: "Product created",
      product: newProduct,
    });
  } catch (error) {
    console.log("error in create order api->", error);
    // Handle Mongoose validation errors with a 400 and readable message
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

const getAllProductsDataController = async (req, res) => {
  try {
    let category = req.params.category;

    if (!category || typeof category !== "string") {
      return res.status(200).json({
        productsData: [],
        message: "Category is required",
      });
    }

    // Normalize to lowercase so "Men", "MEN", "men" all match DB (ladies, men, kids, beauty, home)
    const categoryLower = category.trim().toLowerCase();

    let products = await ProductModel.find({ category: categoryLower }).lean();

    return res.status(200).json({
      productsData: Array.isArray(products) ? products : [],
      message: products && products.length > 0 ? "Products fetched" : "No products found",
    });
  } catch (error) {
    console.log("error in get product api->", error);
    return res.status(200).json({
      productsData: [],
      message: "No products found",
    });
  }
};

const getSellerProductsController = async (req, res) => {
  try {
    if (!req.seller) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const sellerId = req.seller._id;
    const products = await ProductModel.find({ seller_id: sellerId }).lean();
    return res.status(200).json({ productsData: Array.isArray(products) ? products : [], message: "Seller products fetched" });
  } catch (error) {
    console.log("error in get seller products->", error);
    return res.status(500).json({ productsData: [], message: "Failed to fetch seller products" });
  }
};

const updateProductDataController = async (req, res) => {
  try {
    let product_id = req.params.id;
    let seller_id = req.seller._id;

    if (!product_id)
      return res.status(404).json({
        message: "Product id not found",
      });

    // Check if product exists and belongs to the seller
    let existingProduct = await ProductModel.findById(product_id);
    if (!existingProduct)
      return res.status(404).json({
        message: "Product not found",
      });

    if (existingProduct.seller_id.toString() !== seller_id.toString())
      return res.status(403).json({
        message: "You don't have permission to update this product",
      });

    let { productName, amount, description, currency, size, color } = req.body;

    let updateData = {
      productName,
      price: {
        amount: Number(amount),
        currency,
      },
      description,
    };

    // Convert size and color to arrays if provided
    if (size) {
      updateData.sizes = Array.isArray(size) ? size : size.split(',').map(s => s.trim());
    }
    if (color) {
      updateData.colors = Array.isArray(color) ? color : color.split(',').map(c => c.trim());
    }

    if (req.files && req.files.length > 0) {
      const uploadedImgs = await Promise.all(
        req.files.map(
          async (val) => await sendFiles(val.buffer, val.originalname)
        )
      );
      updateData.images = uploadedImgs.map((val) => val.url);
    }

    let updatedProduct = await ProductModel.findByIdAndUpdate(
      product_id,
      updateData,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(400).json({
        message: "Something went wrong",
      });

    return res.status(200).json({
      message: "Product updated",
      updatedProduct: updatedProduct,
    });
  } catch (error) {
    console.log("error in update product api api->", error);
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    if (!req.seller)
      return res.status(400).json({
        message: "Token not found",
      });

    let product_id = req.params.id;
    let seller_id = req.seller._id;

    if (!product_id)
      return res.status(404).json({
        message: "Product id not found",
      });

    // Check if product exists and belongs to the seller
    let existingProduct = await ProductModel.findById(product_id);
    if (!existingProduct)
      return res.status(404).json({
        message: "Product not found",
      });

    if (existingProduct.seller_id.toString() !== seller_id.toString())
      return res.status(403).json({
        message: "You don't have permission to delete this product",
      });

    let delPro = await ProductModel.findByIdAndDelete(product_id);

    if (!delPro)
      return res.status(404).json({
        message: "Product not found",
      });

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("error in delete product api->", error);
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId - basic check
    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductModel.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.log("error in getSingleProduct->", error);
    return res.status(500).json({ message: "Failed to fetch product" });
  }
};

module.exports = {
  createProductController,
  getAllProductsDataController,
  getSellerProductsController,
  getSingleProductController,
  updateProductDataController,
  deleteProductController,
};
