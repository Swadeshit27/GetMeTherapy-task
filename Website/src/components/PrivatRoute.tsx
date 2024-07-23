import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivatePage = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
        return children;
    }
    return <Navigate to={'/login'} />
}

export default PrivatePage
