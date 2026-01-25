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

    let { productName, amount, description, currency, size, color, category } =
      req.body;

    if (
      !productName ||
      !amount ||
      !description ||
      !currency ||
      !color ||
      !size ||
      !category
    )
      return res.status(422).json({
        message: "All fields are required",
      });

    // Convert size and color to arrays if they're strings
    const sizesArray = Array.isArray(size) ? size : size.split(',').map(s => s.trim());
    const colorsArray = Array.isArray(color) ? color : color.split(',').map(c => c.trim());

    let newProduct = await ProductModel.create({
      productName,
      price: {
        amount: Number(amount),
        currency,
      },
      category,
      description,
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
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

const getAllProductsDataController = async (req, res) => {
  try {
    let category = req.params.category;

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    let products = await ProductModel.find({ category });

    // Return empty array instead of 404 for better UX
    return res.status(200).json({
      productsData: products || [],
      message: products && products.length > 0 ? "Products fetched" : "No products found",
    });
  } catch (error) {
    console.log("error in get product api->", error);
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
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

module.exports = {
  createProductController,
  getAllProductsDataController,
  updateProductDataController,
  deleteProductController,
};
