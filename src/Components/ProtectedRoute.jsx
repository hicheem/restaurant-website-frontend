import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserStatusContext } from '../App';

const ProtectedRoute = (props) => {
    const [userStatus, ] = useContext(UserStatusContext)
    if(!userStatus){
        return <Navigate to='/login'/>;
    }
    return props.children;

}

export default ProtectedRoute