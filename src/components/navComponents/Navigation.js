import React, {useContext} from 'react'
import { NavLink, Link} from 'react-router-dom'
import AuthContext from '../adminComponents/AuthContext'
import "./nav.css"
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
            <NavLink to="/cards" style={({ isActive }) => active(isActive)}>View Cards</NavLink>
            <NavLink to="/cards/new/" style={({ isActive }) => active(isActive)} >Create Card</NavLink>
           {user ? (
                <button onClick={contextData.logout}>Logout</button>
           ): <Link to='/login'>Login</Link>}
           {user && <div style={{color: "white"}}>{user.username}</div> }
        </div>
    )
}

export default Navigation