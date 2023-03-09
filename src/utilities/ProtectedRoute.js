import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Context";

const ProtectedRoute = ({ children, user }) => {
  console.log(user);
  if (!user) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default ProtectedRoute;
