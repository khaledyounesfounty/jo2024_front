import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole } from '../utils/authUtils';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    const requiredRole = user &&  user.role ;
    if (!hasRole(requiredRole)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
