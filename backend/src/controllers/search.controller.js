const ProductModel = require("../models/product.model");

const searchProductsController = async (req, res) => {
  try {
    const { query, category } = req.query;

    if (!query || query.trim().length === 0) {
      return res.status(200).json({
        status: false,
        message: "Search query is required",
        productsData: [],
      });
    }

    const searchQuery = query.trim();
    const searchRegex = new RegExp(searchQuery, "i"); // Case-insensitive search

    let searchFilter = {
      $or: [
        { productName: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ],
    };

    // If category is provided, add it to the filter
    if (category && category.trim().length > 0) {
      searchFilter.category = new RegExp(category, "i");
    }

    const products = await ProductModel.find(searchFilter).limit(50);

    return res.status(200).json({
      status: true,
      productsData: products,
      message: `Found ${products.length} product(s)`,
      query: searchQuery,
    });
  } catch (error) {
    console.log("error in search products api->", error);
    return res.status(200).json({
      status: false,
      message: "Error searching products",
      error: error.message,
      productsData: [],
    });
  }
};

module.exports = {
  searchProductsController,
};
