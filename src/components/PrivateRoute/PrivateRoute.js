import React from 'react';
import { useContext } from 'react';
import { Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { MyContext } from '../../App';

const PrivateRoute = () => {
    const [loggedInUser, setLoggedInUser] = useContext(MyContext);
    const location = useLocation();


    return (

        loggedInUser.email ? <Outlet></Outlet> : <Navigate to="/login" replace state={{ from: location }}></Navigate>

    );
};

export default PrivateRoute;