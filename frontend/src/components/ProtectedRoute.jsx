import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children, fallback }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="spinner"></div>
        <p>Loading your adventure...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="auth-required-container">
        <h3>Authentication Required</h3>
        <p>Please log in to continue your journey.</p>
        <a href="#login" className="btn-primary">Go to Login</a>
      </div>
    );
  }

  return children;
}
