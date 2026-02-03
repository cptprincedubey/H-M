import React, { useState } from "react";
import { fetchProductDataHook } from "../hooks/ladiesHook";
import ProductCard from "../components/ProductCard";

const LadiesPage = () => {
  const { data: ladiesData, isPending } = fetchProductDataHook("ladies");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  const categories = [
    { id: "all", name: "All" },
    { id: "dresses", name: "Dresses" },
    { id: "tops", name: "Tops & T-shirts" },
    { id: "jeans", name: "Jeans" },
    { id: "jackets", name: "Jackets & Coats" },
    { id: "shoes", name: "Shoes" },
    { id: "accessories", name: "Accessories" },
  ];

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-xl font-medium">Loading...</div>
      </div>
    );
  }

  const products = ladiesData?.productsData || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=600&fit=crop"
          alt="Ladies Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">LADIES</h1>
          <p className="text-xl font-light">Discover the latest trends</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-[1600px] mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Sort and Filter Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            {products.length} items
          </div>
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
            >
              <option value="recommended">Recommended</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-[1600px] mx-auto px-4 pb-16">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LadiesPage;