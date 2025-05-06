import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import axiosAuth from '../../axios'; 

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axiosAuth.get('/api/users/current')
            .then(() => {
                setIsAuthenticated(true); 
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />; 
    }

    return children; 
};

export default ProtectedRoute;
