import React, {useContext} from 'react'
import AuthContext from './AuthContext'

const Login = () => {
    const {contextData} = useContext(AuthContext)
  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={contextData.loginUser}>
           <div>
             <input type="text" name="username" placeholder='enter username'/>
            </div>
           <div>
           <input type="password" name="password" placeholder='enter password'/>
            </div> 
           <div>
            <input type="submit"/>
            </div>
        </form>
    </div>
  )
}

export default Login