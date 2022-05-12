import React from 'react'
import { NavLink } from 'react-router-dom'
import "./nav.css"
const Navigation = () => {
    const active = (isActive) => {
        return {
            backgroundColor: isActive ? "white" : "",
            color: isActive ? "black" : ""
        }
    }
    return (
        <div className='nav'>
            <NavLink to="/" style={({ isActive }) => active(isActive)}>View Cards</NavLink>
            <NavLink to="/createCard" style={({ isActive }) => active(isActive)} >Create Card</NavLink>
        </div>
    )
}

export default Navigation