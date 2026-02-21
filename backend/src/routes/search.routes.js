const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

// GET /api/search/suggestions?q=query
router.get("/suggestions", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json([]);

    // Fallback for when MongoDB is not connected or empty
    let suggestions = [];
    try {
      suggestions = await Product.find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { category: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } }
        ]
      })
      .select("name category _id")
      .limit(8);
    } catch (dbError) {
      console.error("Database search error, using mock suggestions:", dbError.message);
      // Provide some mock suggestions if DB fails so UI still works
      const mockData = [
        { _id: "1", name: "Oversized Cotton Shirt", category: "Men" },
        { _id: "2", name: "Slim Fit Jeans", category: "Men" },
        { _id: "3", name: "Floral Summer Dress", category: "Ladies" },
        { _id: "4", name: "Knit Sweater", category: "Ladies" },
        { _id: "5", name: "Denim Jacket", category: "Kids" }
      ];
      suggestions = mockData.filter(item => 
        item.name.toLowerCase().includes(q.toLowerCase()) || 
        item.category.toLowerCase().includes(q.toLowerCase())
      );
    }

    res.json(suggestions);
  } catch (error) {
    console.error("Search suggestions error:", error);
    res.status(500).json({ message: "Error fetching suggestions" });
  }
});

// GET /api/search/popular
router.get("/popular", async (req, res) => {
  try {
    // In a real app, this would be based on analytics. 
    // For now, return some random products or hardcoded popular terms
    const popular = [
      { name: "LADIES JACKET EDIT '25" },
      { name: "SHIRT MEN" },
      { name: "TOPS & T-SHIRTS KIDS" }
    ];
    res.json(popular);
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular searches" });
  }
});

module.exports = router;