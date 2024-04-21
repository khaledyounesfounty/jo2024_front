import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole } from '../utils/authUtils';
import {AuthResponse, User} from "../types/authTypes";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;
    const requiredRole = user &&  user.role === 'ADMIN' ? 'ADMIN' : 'USER';
    if (!hasRole(requiredRole)) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
