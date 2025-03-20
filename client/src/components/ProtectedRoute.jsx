import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context.jsx';



const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <h1 className="text-2xl text-red-500">Access Denied: You are not authorized to view this page.</h1>;
    }

    return children;
};

export default ProtectedRoute;
