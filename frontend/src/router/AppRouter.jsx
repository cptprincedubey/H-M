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
import { AuthProvider } from "../context/AuthContext";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "",
          element: <LadiesPage />,
        },
        {
          path: "men",
          element: <MenPage />,
        },
        {
          path: "kids",
          element: <KidsPage />,
        },
        {
          path: "beauty",
          element: <BeautyPage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "seller/login",
          element: <SellerLogin />,
        },
        {
          path: "seller/register",
          element: <SellerRegister />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppRouter;
