import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { User, Heart, ShoppingBag, LogOut, ArrowRight, Award, Settings } from "lucide-react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { favorites } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  const [activeTab, setActiveTab] = useState("account");

  if (!user) {
    return (
      <div className="min-h-screen bg-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">User Profile</h1>
          <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">Please log in to view your profile</p>
          <Link to="/login" className="bg-black text-white px-6 md:px-8 py-2 md:py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition inline-block text-sm md:text-base">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    localStorage.setItem("user", JSON.stringify(editedUser));
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Sign Out */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight">Account & Rewards</h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">Welcome, {user.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-bold uppercase text-xs md:text-sm tracking-wider transition duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <LogOut size={18} strokeWidth={2} className="md:w-5 md:h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-6 md:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              {/* User Card */}
              <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center mb-6 md:mb-8">
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-black rounded-full flex items-center justify-center text-white mx-auto mb-3 md:mb-4">
                    <User size={32} strokeWidth={1.5} className="md:w-10 md:h-10" />
                  </div>
                  <p className="font-bold text-base md:text-lg uppercase tracking-tight">{user.name}</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">{user.email}</p>
                </div>

                <div className="border-t border-gray-200 pt-4 md:pt-6 mb-4 md:mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">Points Balance</p>
                  <p className="text-3xl md:text-4xl font-black mb-1">0</p>
                  <p className="text-xs text-gray-500">Available Points</p>
                </div>

                <div className="border-t border-gray-200 pt-4 md:pt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">Member ID</p>
                  <p className="text-xs md:text-sm font-bold break-all">{user._id || user.id || "N/A"}</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="mt-4 md:mt-6 space-y-2 bg-white p-3 md:p-4 rounded-lg border border-gray-200">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded font-bold uppercase text-xs md:text-sm tracking-wider transition ${
                    activeTab === "account" ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Account Info
                </button>
                <Link
                  to="/update-password"
                  className="block w-full text-left px-3 md:px-4 py-2 md:py-3 hover:bg-gray-100 text-gray-700 rounded font-bold uppercase text-xs md:text-sm tracking-wider transition"
                >
                  Change Password
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center justify-between px-3 md:px-4 py-2 md:py-3 hover:bg-gray-100 text-gray-700 rounded font-bold uppercase text-xs md:text-sm tracking-wider transition"
                >
                  <span>Favorites</span>
                  <span className="bg-red-600 text-white text-[10px] px-2 py-1 md:px-2.5 md:py-1 rounded-full font-bold">{favorites.length}</span>
                </Link>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              {/* Account & Rewards Sections */}
              {activeTab === "account" && (
                <div className="space-y-6 md:space-y-8">
                  {/* Profile Information Card */}
                  <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 gap-4">
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Profile Information</h2>
                      <button
                        onClick={() => {
                          if (isEditing) {
                            handleSaveProfile();
                          } else {
                            setIsEditing(true);
                          }
                        }}
                        className="bg-black hover:bg-gray-800 text-white px-4 md:px-6 py-2 md:py-3 font-bold uppercase text-xs md:text-sm tracking-wider rounded transition w-full sm:w-auto"
                      >
                        {isEditing ? "Save Changes" : "Edit Profile"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={editedUser.name || ""}
                            onChange={handleInputChange}
                            className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm md:text-base"
                          />
                        ) : (
                          <p className="text-base md:text-lg text-gray-900 font-semibold">{user.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                          Email Address
                        </label>
                        <p className="text-base md:text-lg text-gray-900 font-semibold break-word">{user.email}</p>
                      </div>

                      {isEditing && (
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={editedUser.phone || ""}
                              onChange={handleInputChange}
                              placeholder="Enter phone number"
                              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm md:text-base"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                              Address (Optional)
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={editedUser.address || ""}
                              onChange={handleInputChange}
                              placeholder="Enter address"
                              className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-sm md:text-base"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {isEditing && (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="mt-6 md:mt-8 w-full border-2 border-black text-black px-4 md:px-6 py-2 md:py-3 font-bold uppercase text-xs md:text-sm tracking-wider hover:bg-gray-50 rounded transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* Account Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition">
                      <ShoppingBag size={28} className="mx-auto mb-3 md:mb-4 text-gray-700" strokeWidth={1.5} />
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-2">Total Orders</p>
                      <p className="text-3xl md:text-4xl font-black">0</p>
                    </div>

                    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition">
                      <Heart size={28} className="mx-auto mb-3 md:mb-4 text-red-600" strokeWidth={1.5} />
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-2">Saved Items</p>
                      <p className="text-3xl md:text-4xl font-black text-red-600">{favorites.length}</p>
                    </div>

                    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition sm:col-span-2 lg:col-span-1">
                      <Award size={28} className="mx-auto mb-3 md:mb-4 text-blue-600" strokeWidth={1.5} />
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-2">Member Since</p>
                      <p className="text-2xl md:text-3xl font-black">{new Date().getFullYear()}</p>
                    </div>
                  </div>

                  {/* H&M Membership Section */}
                  <div className="bg-linear-to-r from-gray-900 to-black text-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 md:mb-6 gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-2">Premium Member</h3>
                        <p className="text-sm text-gray-300">Enjoy exclusive benefits and rewards</p>
                      </div>
                      <div className="bg-white bg-opacity-10 px-3 md:px-4 py-2 rounded-lg self-start">
                        <p className="font-bold uppercase text-xs tracking-wider">Active</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-1">Free Shipping</p>
                        <p className="text-base md:text-lg font-bold">On all orders</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-1">Points Earned</p>
                        <p className="text-base md:text-lg font-bold">Every purchase</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mb-4 md:mb-6">Quick Actions</h3>

                    <div className="space-y-3">
                      <Link
                        to="/update-password"
                        className="flex items-center justify-between p-3 md:p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition"
                      >
                        <span className="font-bold uppercase tracking-wider text-sm">Change Password</span>
                        <ArrowRight size={18} strokeWidth={2} className="md:w-5 md:h-5" />
                      </Link>

                      <Link
                        to="/favorites"
                        className="flex items-center justify-between p-3 md:p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition"
                      >
                        <span className="font-bold uppercase tracking-wider text-sm">View Wishlist</span>
                        <ArrowRight size={18} strokeWidth={2} className="md:w-5 md:h-5" />
                      </Link>

                      <Link
                        to="/"
                        className="flex items-center justify-between p-3 md:p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition"
                      >
                        <span className="font-bold uppercase tracking-wider text-sm">Continue Shopping</span>
                        <ArrowRight size={18} strokeWidth={2} className="md:w-5 md:h-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
