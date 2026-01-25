const ProductModel = require("../models/product.model");

const searchProductsController = async (req, res) => {
  try {
    const { query, category } = req.query;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const searchRegex = new RegExp(query, "i"); // Case-insensitive search

    let searchFilter = {
      $or: [
        { productName: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
      ],
    };

    // If category is provided, add it to the filter
    if (category) {
      searchFilter.category = category;
    }

    const products = await ProductModel.find(searchFilter).limit(50);

    return res.status(200).json({
      productsData: products,
      message: `Found ${products.length} product(s)`,
      query: query,
    });
  } catch (error) {
    console.log("error in search products api->", error);
    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  searchProductsController,
};
