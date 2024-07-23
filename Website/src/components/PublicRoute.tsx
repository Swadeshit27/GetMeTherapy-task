import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
        return <Navigate to={'/'} />
    }
    return children;
}

export default PublicRoute
