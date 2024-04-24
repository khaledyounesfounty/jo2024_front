// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user.roles.includes(role)) {
    // Redirect to login if not authorized
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
