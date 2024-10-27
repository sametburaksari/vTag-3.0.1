import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'corporate' | 'user')[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = (() => {
      switch (user.role) {
        case 'admin':
          return '/admin';
        case 'corporate':
          return '/corporate';
        case 'user':
          return '/user';
        default:
          return '/login';
      }
    })();

    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}