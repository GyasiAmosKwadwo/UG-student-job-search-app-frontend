import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If the user's role isn't allowed here, redirect to their respective home
    return <Navigate to={`/${userRole}/dashboard`} replace />;
  }

  // Renders the child routes
  return <Outlet />;
};

export default ProtectedRoute;
