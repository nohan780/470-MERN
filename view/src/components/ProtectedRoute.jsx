import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../axios.jsx';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        
        axios.get('/api/getCurrentUser')
            .then(response => {
                setIsAuthenticated(true); // User is logged in
            })
            .catch(error => {
                setIsAuthenticated(false); // User is not logged in
            });
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Optionally show a loading spinner
    }

    if (!isAuthenticated) {
        return <Redirect to="/login" />; // Redirect to login if not authenticated
    }

    return children; // Render the protected route content
};

export default ProtectedRoute;
