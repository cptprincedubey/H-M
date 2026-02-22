import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import LadiesPage from "../pages/LadiesPage";
import MenPage from "../pages/MenPage";
import KidsPage from "../pages/KidsPage";
import HomePage from "../pages/HomePage";
import BeautyPage from "../pages/BeautyPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SellerLogin from "../pages/SellerLogin";
import SellerRegister from "../pages/SellerRegister";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import FavoritesPage from "../pages/FavoritesPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import UpdatePassword from "../pages/UpdatePassword";
import NotFoundPage from "../pages/NotFoundPage";
import { AuthProvider } from "../context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <LadiesPage /> },
      { path: "home", element: <HomePage /> },
      { path: "ladies", element: <LadiesPage /> },
      { path: "men", element: <MenPage /> },
      { path: "kids", element: <KidsPage /> },
      { path: "beauty", element: <BeautyPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "update-password", element: <UpdatePassword /> },
      { path: "seller/login", element: <SellerLogin /> },
      { path: "seller/register", element: <SellerRegister /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "*", element: <NotFoundPage /> },
     
    ],
  },
]);

const AppRouter = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppRouter;
