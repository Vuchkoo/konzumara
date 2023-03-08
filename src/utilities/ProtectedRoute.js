import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Context";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAuth();

  if (!user.role === "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
