import React, {useContext} from 'react'
import { NavLink} from 'react-router-dom'
import AuthContext from '../adminComponents/AuthContext'
import "./nav.scss"
const Navigation = () => {
    const {contextData} = useContext(AuthContext)
    const user = contextData.user
    const active = (isActive) => {
        return {
            backgroundColor: isActive ? "white" : "",
            color: isActive ? "black" : ""
        }
    }
    return (
        <div className='nav'>
            <NavLink to="/" style={({ isActive }) => active(isActive)}>Home</NavLink>
            <NavLink to="/cards" style={({ isActive }) => active(isActive)}>View Cards</NavLink>
            <NavLink to="/new/card" style={({ isActive }) => active(isActive)} >Create Card</NavLink>
            <div className='userName'>{user ? (
                    <NavLink to='/login' onClick={contextData.logout}>Logout</NavLink>
            ): <NavLink to='/login' style={({ isActive }) => active(isActive)}>Login</NavLink>}
            {user && <div style={{color: "white", padding: "10px"}}>{user.username}</div> }
            </div>
        </div>
    )
}

export default Navigation