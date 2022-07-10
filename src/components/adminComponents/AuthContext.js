import React, {createContext, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import Navigation from '../navComponents/Navigation'
// install and import jwt_decode for tokens
import jwt_decode from 'jwt-decode'

const AuthContext = createContext({

})

export default AuthContext

export const AuthProvider = () => {
    let [user, setUser] = useState(() =>localStorage.getItem('authTokens') 
    ? jwt_decode( localStorage.getItem('authTokens')): null)
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') 
    ? JSON.parse( localStorage.getItem('authTokens')): null)
    const jumpTo = useNavigate()
    const loginUser = async (e) => {
        
        e.preventDefault()
        let response = await fetch("http://127.0.0.1:8000/token/", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body:JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            jumpTo('/cards/')
        } else {
            alert('Something went Wrong!')
        }
    }
    const logout = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        jumpTo('/login/')
    }

    let contextData = {
        user:user,
        logout:logout,
        loginUser: loginUser
    }
    

    return (
        <AuthContext.Provider value={{contextData}}>
            <Navigation />
            <Outlet />
        </AuthContext.Provider>
    )
}