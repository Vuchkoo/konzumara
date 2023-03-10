import React from "react";
import { Route, Routes } from "react-router-dom";
import EditCategories from "./components/forms/EditCategories";
import EditProduct from "./components/forms/EditProduct";
import { useAuth } from "./context/Context";
import AdminSignIn from "./pages/admin/AdminSignIn";
import Categories from "./pages/admin/Categories";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";
import { Error } from "./pages/Error";
import Home from "./pages/Home";
import ProtectedRoute from "./utilities/ProtectedRoute";

export const Navigation = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="admin" element={<AdminSignIn />} />
      <Route
        path="admin/products"
        element={
          <ProtectedRoute user={user}>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/products/:id"
        element={
          <ProtectedRoute user={user}>
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/products/create"
        element={
          <ProtectedRoute user={user}>
            <CreateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/categories"
        element={
          <ProtectedRoute user={user}>
            <Categories />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/categories/:id"
        element={
          <ProtectedRoute user={user}>
            <EditCategories />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/categories/create"
        element={
          <ProtectedRoute user={user}>
            <CreateCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="admin/orders"
        element={
          <ProtectedRoute user={user}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
