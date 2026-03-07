// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { setSellerToken } from "../config/axiosInstance";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [seller, setSeller] = useState(() => {
    try {
      const storedSeller = localStorage.getItem("seller");
      return storedSeller ? JSON.parse(storedSeller) : null;
    } catch {
      return null;
    }
  });

  const [sellerToken, setSellerTokenState] = useState(() => {
    return localStorage.getItem("sellerToken") || null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (seller) {
      localStorage.setItem("seller", JSON.stringify(seller));
    } else {
      localStorage.removeItem("seller");
    }
  }, [seller]);

  useEffect(() => {
    if (sellerToken) {
      localStorage.setItem("sellerToken", sellerToken);
      setSellerToken(sellerToken);
    } else {
      localStorage.removeItem("sellerToken");
      setSellerToken(null);
    }
  }, [sellerToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, seller, setSeller, sellerToken, setSellerToken: setSellerTokenState }}>
      {children}
    </AuthContext.Provider>
  );
};