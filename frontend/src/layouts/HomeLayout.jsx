import React from "react";
import { NavLink, Outlet } from "react-router";
import { Heart, Search, ShoppingBag, User } from "lucide-react";

const HomeLayout = () => {
  return (
    <div className="h-screen flex flex-col gap-4">
      <nav className="border-b border-gray-400 py-3 px-8 justify-between flex items-center">
        <div className="flex items-center gap-12">
          <div className="h-13 w-13">
            <img
              className="h-full w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
              alt=""
            />
          </div>
          <div className="flex gap-5 text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black" : "text-gray-400"
              }
              to="/"
            >
              Ladies
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black" : "text-gray-400"
              }
              to="/men"
            >
              Men
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black" : "text-gray-400"
              }
              to="/kids"
            >
              Kids
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black" : "text-gray-400"
              }
              to="/home"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black" : "text-gray-400"
              }
              to="/beauty"
            >
              Beauty
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search className="text-gray-600" size={20} />
          <User className="text-gray-600" size={20} />
          <Heart className="text-gray-600" size={20} />
          <ShoppingBag className="text-gray-600" size={20} />
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
