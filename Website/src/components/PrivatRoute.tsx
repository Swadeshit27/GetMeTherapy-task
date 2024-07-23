import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivatePage = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticate, setISAuthenticate] = useState(false);

    auth.onAuthStateChanged((user) => {
        if (user) setISAuthenticate(true);
        else setISAuthenticate(false)
    })
    if (isAuthenticate) {
        return children;
    }
    return <Navigate to={'/login'} />
}

export default PrivatePage
