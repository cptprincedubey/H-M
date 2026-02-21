import React, { useState } from "react";
import { Link } from "react-router";
import SearchModal from "./SearchModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-black text-white text-center py-2 px-4">
        <p className="text-xs md:text-sm">
          Free shipping on orders over $40 | Free returns
        </p>
      </div>

      {/* Main Header */}
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="text-3xl md:text-4xl font-bold">
            H&M
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/ladies" className="text-sm font-medium hover:underline uppercase tracking-wide">
              Ladies
            </Link>
            <Link to="/men" className="text-sm font-medium hover:underline uppercase tracking-wide">
              Men
            </Link>
            <Link to="/kids" className="text-sm font-medium hover:underline uppercase tracking-wide">
              Kids
            </Link>
            <Link to="/home" className="text-sm font-medium hover:underline uppercase tracking-wide">
              Home
            </Link>
            <Link to="/beauty" className="text-sm font-medium hover:underline uppercase tracking-wide">
              Beauty
            </Link>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Account */}
            <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full" aria-label="Account">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Favorites */}
            <Link to="/favorites" className="p-2 hover:bg-gray-100 rounded-full" aria-label="Favorites">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Shopping Bag */}
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full relative" aria-label="Shopping bag">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col">
            <Link
              to="/ladies"
              className="px-4 py-4 text-sm font-medium uppercase tracking-wide border-b border-gray-100 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Ladies
            </Link>
            <Link
              to="/men"
              className="px-4 py-4 text-sm font-medium uppercase tracking-wide border-b border-gray-100 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              to="/kids"
              className="px-4 py-4 text-sm font-medium uppercase tracking-wide border-b border-gray-100 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Kids
            </Link>
            <Link
              to="/home"
              className="px-4 py-4 text-sm font-medium uppercase tracking-wide border-b border-gray-100 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/beauty"
              className="px-4 py-4 text-sm font-medium uppercase tracking-wide hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Beauty
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;