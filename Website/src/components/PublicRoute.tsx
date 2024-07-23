import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticate, setISAuthenticate] = useState(false);

    useEffect(() => {
        const user = auth.currentUser; 
        if (user) setISAuthenticate(true);
        else setISAuthenticate(false)
    }, [])
    if (isAuthenticate) {
        return <Navigate to={'/'} />
    }
    return children;
}

export default PublicRoute
