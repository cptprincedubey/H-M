const express = require("express");
const upload = require("../config/multer");
const {
  createProductController,
  getAllProductsDataController,
  updateProductDataController,
  deleteProductController,
} = require("../controllers/product.controller");
const sellerMiddleware = require("../middlewares/seller.middleware");

const router = express.Router();

router.post("/create", upload.array("images", 5), createProductController);

router.get("/:category", getAllProductsDataController);
router.put(
  "/update/:id",
  sellerMiddleware,
  upload.array("images", 5),
  updateProductDataController
);
router.delete("/delete/:id", sellerMiddleware, deleteProductController);

module.exports = router;
