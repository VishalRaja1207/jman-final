import React from "react";
// import toast from 'react-hot-toast';
import { Navigate } from "react-router-dom";
export const RequiredAuth = (props) => {
    if(!localStorage.getItem('token')) {
        return <Navigate to="/"></Navigate>
    }
    else {
        return props.children;
    }
}