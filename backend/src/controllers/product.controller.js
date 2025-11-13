const ProductModel = require("../models/product.model");
const sendFiles = require("../services/storage.services");

const createProductController = async (req, res) => {
  try {
    let seller_id = req.seller;

    if (!req.files)
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

    let newProduct = await ProductModel.create({
      productName,
      price: {
        amount,
        currency,
      },
      category,
      description,
      colors: color,
      sizes: size,
      images: uploadedImgs.map((val) => val.url),
    });

    return res.status(201).json({
      message: "Product created",
    });
  } catch (error) {
    console.log("error in create order api->", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const getAllProductsDataController = async (req, res) => {
  try {
    let category = req.params.category;

    let products = await ProductModel.find({ category });

    if (!products)
      return res.status(404).json({
        message: "No products found",
      });

    return res.status(200).json({
      productsData: products,
      message: "Product fetched",
    });
  } catch (error) {
    console.log("error in get product api->", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

const updateProductDataController = async (req, res) => {
  try {
    let product_id = req.params.id;

    if (!product_id)
      return res.status(404).json({
        message: "Product id not found",
      });

    let { productName, amount, description, currency, size, color } = req.body;

    const uploadedImgs = await Promise.all(
      req.files.map(
        async (val) => await sendFiles(val.buffer, val.originalname)
      )
    );

    let updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: product_id },
      {
        productName,
        price: {
          amount,
          currency,
        },
        description,
        colors: color,
        sizes: size,
        images: uploadedImgs.map((val) => val.url),
      }
    );

    await updatedProduct.save();

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

    if (!product_id)
      return res.status(404).json({
        message: "Product id not found",
      });

    let delPro = await ProductModel.findByIdAndDelete(product_id);
  } catch (error) {
    console.log("error in delete product api->", error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = {
  createProductController,
  getAllProductsDataController,
  updateProductDataController,
  deleteProductController,
};
