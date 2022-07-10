import React, {useContext} from 'react'
import {Outlet, Navigate} from "react-router-dom"
import AuthContext from './AuthContext'
const PrivateRoute = () => {
    const {contextData} = useContext(AuthContext)
    const isUser = !contextData.user ? <Navigate to="/login" replace /> 
    : ""
  return (
    <div> 
        {isUser}
        <Outlet />
    </div>
  )
}

export default PrivateRoute