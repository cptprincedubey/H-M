import React, { useState, useEffect, useRef } from "react";
import { X, Search, Clock, TrendingUp } from "lucide-react";
import { axiosInstance } from "../config/axiosInstance";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem("searchHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [popularSearches, setPopularSearches] = useState([
    { name: "LADIES JACKET EDIT '25" },
    { name: "SHIRT MEN" },
    { name: "TOPS & T-SHIRTS KIDS" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      fetchPopularSearches();
    }
  }, [isOpen]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchPopularSearches = async () => {
    try {
      const res = await axiosInstance.get("/search/popular");
      setPopularSearches(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSuggestions = async (query) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/search/suggestions?q=${query}`);
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) return;
    
    const newHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    
    onClose();
    // navigate(`/search?q=${query}`); // Assuming a search results page exists or we filter current
    console.log("Searching for:", query);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in slide-in-from-right duration-300">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-10" /> {/* Spacer */}
          <div className="text-2xl font-bold tracking-tighter italic text-[#E50010]">H&M</div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Search Input Section */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <div className="flex items-center border-b-2 border-black pb-2">
            <Search size={20} className="text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="SEARCH"
              className="flex-1 text-lg outline-none uppercase tracking-widest placeholder:text-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold underline tracking-widest hover:text-gray-600"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 pb-20">
          {/* Left Column: History & Popular */}
          <div>
            {searchHistory.length > 0 && !searchQuery && (
              <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase flex items-center">
                    <Clock size={14} className="mr-2" />
                    Search History
                  </h3>
                  <button 
                    onClick={clearHistory}
                    className="text-[10px] font-bold underline tracking-widest hover:text-gray-600"
                  >
                    CLEAR
                  </button>
                </div>
                <div className="space-y-3">
                  {searchHistory.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(item)}
                      className="block text-sm uppercase tracking-widest hover:underline text-left w-full"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!searchQuery && (
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase flex items-center mb-4">
                  <TrendingUp size={14} className="mr-2" />
                  Popular Searches
                </h3>
                <div className="space-y-3">
                  {popularSearches.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearch(item.name)}
                      className="block text-sm uppercase tracking-widest hover:underline text-left w-full"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Suggestions */}
          <div>
            {searchQuery.length > 1 && (
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  Suggestions
                </h3>
                {isLoading ? (
                  <div className="text-xs tracking-widest text-gray-400">LOADING...</div>
                ) : suggestions.length > 0 ? (
                  <div className="space-y-4">
                    {suggestions.map((item) => (
                      <button
                        key={item._id}
                        onClick={() => handleSearch(item.name)}
                        className="group flex flex-col items-start w-full text-left"
                      >
                        <span className="text-sm font-medium uppercase tracking-widest group-hover:underline">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                          in {item.category}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs tracking-widest text-gray-400">NO RESULTS FOUND</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
