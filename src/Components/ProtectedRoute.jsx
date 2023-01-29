import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { UserStatusContext } from '../App';

const ProtectedRoute = (props) => {
    const [userStatus, ] = useContext(UserStatusContext)
    // const userStatus = window.localStorage.getItem("userStatus")

    
    if(!userStatus){
        return <Navigate to='/login'/>;
    }
    return props.children;

}

export default ProtectedRoute