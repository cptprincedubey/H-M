import React from "react";
import { fetchProductDataHook } from "../hooks/ladiesHook";
import ProductCard from "../components/ProductCard";

const BeautyPage = () => {
  const { data, isPending, error } = fetchProductDataHook("beauty");

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">
            Error loading products: {error.response?.data?.message || error.message || "Network error"}
          </div>
          <div className="text-gray-500 text-sm">
            Please make sure the backend server is running on port 4500
          </div>
        </div>
      </div>
    );
  }

  const products = data?.productsData || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Beauty Collection</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BeautyPage;
