import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

/**
 * ProtectedRoute Wrapper
 * Ensures only users with a valid, non-expired JWT session can access children routes.
 */
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const isAuth = authService.isAuthenticated();

  if (!isAuth) {
    // Redirect to /login while preserving attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
