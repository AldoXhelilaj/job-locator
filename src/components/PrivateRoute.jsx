import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth';

const PrivateRoute = () => {
    const { currentUser } = useAuth(); 

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    } 

    return <Outlet />;
};

export default PrivateRoute;