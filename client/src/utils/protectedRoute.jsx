import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Access authentication status

    return isAuthenticated ? children : <Navigate to="/adminlogin" />; // Navigate to login if not authenticated
};

export default ProtectedRoute;
