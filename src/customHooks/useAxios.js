import React, {useContext} from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode'
import AuthContext from '../components/adminComponents/AuthContext'
// creating a custom hook for axios

const useAxios = () => {
const { authTokens, setUser, setAuthTokens} = useContext(AuthContext)
const baseURL = "http://127.0.0.1:8000"

const axiosInstance = axios.create({
    baseURL,
    headers: { 
        "content-type": "application/json",
        Authorization:`Bearer ${authTokens?.access}`
    }
})

axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
    if(!isExpired) return req
    
    // request for a new token
    const res = await axios.post(`${baseURL}/token/refresh/`, { 
        refresh: authTokens.refresh 
    })
    // get a new token and access token then add it to the headers
    localStorage.setItem('authTokens', JSON.stringify(res.data))
    setAuthTokens(res.data)
    setUser(jwt_decode(res.data.access))
    req.headers.Authorization = `Bearer ${res.data.access}`
    return req
})
  return axiosInstance
}

export default useAxios