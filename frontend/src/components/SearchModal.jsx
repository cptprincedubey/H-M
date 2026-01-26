import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { axiosInstance } from "../config/axiosInstance";
import { searchProducts } from "../api/ProductApis";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  // Popular searches matching H&M style
  const popularSearches = [
    "LADIES JACKET EDIT '25",
    "HOODIES & SWEATS MEN",
    "SWEATSHIRTS KIDS",
    "DRESSES LADIES",
    "JEANS MEN",
    "T-SHIRTS KIDS",
    "BEAUTY PRODUCTS",
    "HOME DECOR"
  ];

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSearchResults([]);
      setError(null);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Restore body scroll when modal closes
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
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

  const handlePopularSearch = (term) => {
    setSearchQuery(term);
    handleSearch(term);
  };

  const handleProductClick = (product) => {
    onClose();
    // Could navigate to product detail page if you have one
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Search Panel - Slides from right */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[480px] lg:w-[520px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="h-full flex flex-col">
          {/* Search Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex items-center flex-1 border-b border-gray-300 pb-2">
              <SearchIcon className="text-gray-500 mr-3 flex-shrink-0" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-base outline-none border-none focus:outline-none placeholder-gray-400 bg-transparent"
                autoFocus
              />
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-1 hover:bg-gray-100 rounded-full transition flex-shrink-0"
              aria-label="Close search"
            >
              <X size={22} className="text-gray-700" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {isSearching && (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-500 text-sm">Searching...</div>
              </div>
            )}

            {error && (
              <div className="px-6 py-8">
                <div className="text-red-500 text-sm">{error}</div>
              </div>
            )}

            {/* Search Results */}
            {!isSearching && !error && searchQuery && searchResults.length > 0 && (
              <div className="px-6 py-6">
                <div className="mb-5 text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Search Results ({searchResults.length})
                </div>
                <div className="space-y-4">
                  {searchResults.slice(0, 10).map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleProductClick(product)}
                      className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition group"
                    >
                      <div className="flex items-start gap-4">
                        {product.images?.[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.productName}
                            className="w-20 h-20 object-cover rounded flex-shrink-0 group-hover:opacity-90 transition"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 group-hover:text-black mb-1">
                            {product.productName}
                          </div>
                          <div className="text-xs text-gray-500 uppercase mb-2">
                            {product.category}
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {product.price?.currency || "INR"} {product.price?.amount || product.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {!isSearching && !error && searchQuery && searchResults.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-500 text-sm">
                  No products found matching "{searchQuery}"
                </div>
              </div>
            )}

            {/* Popular Searches - Shown when no search query */}
            {!isSearching && !error && !searchQuery && (
              <div className="px-6 py-8">
                <div className="mb-6 text-xs font-bold text-gray-900 uppercase tracking-widest">
                  Popular Searches
                </div>
                <div className="space-y-1">
                  {popularSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearch(term)}
                      className="w-full text-left px-0 py-3 text-sm text-gray-700 hover:text-black hover:underline transition-all border-b border-transparent hover:border-gray-200"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
