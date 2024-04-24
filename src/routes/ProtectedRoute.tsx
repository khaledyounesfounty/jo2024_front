import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole } from '../utils/authUtils';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children , role }) => {
    if (!hasRole(role)) {
        return <Navigate to="*" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
