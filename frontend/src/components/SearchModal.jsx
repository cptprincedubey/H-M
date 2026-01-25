import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { axiosInstance } from "../config/axiosInstance";
import { searchProducts } from "../api/ProductApis";
import ProductCard from "./ProductCard";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setError(null);
    }
  }, [isOpen]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      // Use the search API endpoint
      const result = await searchProducts(query);
      
      if (result && result.productsData) {
        setSearchResults(result.productsData);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      // Fallback: search across all categories if search API fails
      try {
        const categories = ["ladies", "men", "kids", "beauty", "home"];
        const searchPromises = categories.map((category) =>
          axiosInstance
            .get(`/products/${category}`)
            .then((res) => res.data?.productsData || [])
            .catch(() => [])
        );

        const allProducts = await Promise.all(searchPromises);
        const flattenedProducts = allProducts.flat();

        // Filter products by search query
        const filtered = flattenedProducts.filter((product) => {
          const queryLower = query.toLowerCase();
          return (
            product.productName?.toLowerCase().includes(queryLower) ||
            product.description?.toLowerCase().includes(queryLower) ||
            product.category?.toLowerCase().includes(queryLower)
          );
        });

        setSearchResults(filtered);
      } catch (fallbackErr) {
        setError("Failed to search products. Please make sure the backend is running.");
        setSearchResults([]);
      }
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-bold">Search Products</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            autoFocus
          />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4">
          {isSearching && (
            <div className="text-center py-8">
              <div className="text-gray-500">Searching...</div>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="text-red-500">{error}</div>
            </div>
          )}

          {!isSearching && !error && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500">No products found matching "{searchQuery}"</div>
            </div>
          )}

          {!isSearching && !error && !searchQuery && (
            <div className="text-center py-8">
              <div className="text-gray-500">Start typing to search for products...</div>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div>
              <div className="mb-4 text-sm text-gray-600">
                Found {searchResults.length} product{searchResults.length !== 1 ? "s" : ""}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
