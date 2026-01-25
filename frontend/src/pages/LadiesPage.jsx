// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { fetchProductDataHook } from "../hooks/ladiesHook";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { setMessage } from "../features/errorSlice";
import ProductCard from "../components/ProductCard";

const LadiesPage = () => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const { data, isPending, error } = fetchProductDataHook("ladies");
  console.log(data);
  console.log(error);

  // eslint-disable-next-line no-unused-vars
  const { message } = useSelector((state) => state.error);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  // Handle network errors - data will be empty array if network fails
  const products = data?.productsData || [];
  const hasNetworkError = error && (error.code === 'ERR_NETWORK' || !error.response);
  const showNetworkError = hasNetworkError && products.length === 0;

  if (showNetworkError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">
            Cannot connect to server
          </div>
          <div className="text-gray-500 text-sm mb-4">
            Please make sure the backend server is running on port 4500
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (error && !hasNetworkError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">
            Error: {error.response?.data?.message || error.message || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ladies' Collection</h1>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((elem) => (
            <ProductCard key={elem._id} product={elem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LadiesPage;
