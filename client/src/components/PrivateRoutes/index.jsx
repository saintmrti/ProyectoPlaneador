import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const { isAuth } = useSelector(state => state.auth);
    return(
        isAuth ? <Outlet /> : <Navigate to='login'/>
    )
}