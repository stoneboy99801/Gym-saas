// src/components/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
    const fallbackPath = role === "admin" ? "/admin/dashboard" : role === "owner" ? "/owner/dashboard" : "/member/dashboard";

    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute