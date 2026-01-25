import React from "react";
import { Link } from "react-router";
import { fetchProductDataHook } from "../hooks/ladiesHook";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { data: ladiesData, isPending: ladiesPending } = fetchProductDataHook("ladies");
  const { data: menData, isPending: menPending } = fetchProductDataHook("men");

  const featuredProducts = [
    ...(ladiesData?.productsData?.slice(0, 4) || []),
    ...(menData?.productsData?.slice(0, 4) || []),
  ].slice(0, 8);

  if (ladiesPending || menPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to H&M</h1>
          <p className="text-xl mb-8">Fashion for Everyone, Everywhere</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Ladies
            </Link>
            <Link
              to="/men"
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Men
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        {featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Link
              to="/"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-2">👗</div>
              <h3 className="font-semibold text-lg">Ladies</h3>
            </Link>
            <Link
              to="/men"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-2">👔</div>
              <h3 className="font-semibold text-lg">Men</h3>
            </Link>
            <Link
              to="/kids"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-2">👶</div>
              <h3 className="font-semibold text-lg">Kids</h3>
            </Link>
            <Link
              to="/beauty"
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-2">💄</div>
              <h3 className="font-semibold text-lg">Beauty</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
