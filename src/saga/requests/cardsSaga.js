import { call, put, takeEvery, select } from 'redux-saga/effects'
import { getCardsSuccess } from '../reducers/cardReducer'
import React, { useContext } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import AuthContext from '../../components/adminComponents/AuthContext';

const baseURL = "http://127.0.0.1:8000"

let authToken = localStorage.getItem('authTokens') 
? JSON.parse(localStorage.getItem('authTokens')): null

const axiosInstance = axios.create({
    baseURL,
    headers: { 
        "content-type": "application/json",
        Authorization:`Bearer ${authToken?.access}`
    }
})

axiosInstance.interceptors.request.use(async req => {
    if(!authToken){
        authToken = localStorage.getItem('authTokens') 
        ? JSON.parse(localStorage.getItem('authTokens')): null
        req.headers.Authorization = `Bearer ${authToken?.access}`
    }
    const user = jwt_decode(authToken.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    
    if(!isExpired) return req
    
    // request for a new token
    const res = await axios.post(`${baseURL}/token/refresh/`, { 
        refresh: authToken.refresh 
    })
    // get a new token and access token then add it to the headers
    localStorage.setItem('authTokens', JSON.stringify(res.data))
    req.headers.Authorization = `Bearer ${res.data.access}`
    return req
})

function* workGetCardsFetch() {
    // const cards = yield call(() => fetch('http://127.0.0.1:8000/'))
    // const formattedCards = yield cards.json();
    const options = {
        headers: { 
        "content-type": "application/json"
        }
    }
    const cards = yield call(() => axiosInstance.get())
    yield put(getCardsSuccess(cards.data))
}

function* workCreateCard(action) {
    try {
        const word = action.payload
        const options = {
            headers: { 
            "content-type": "application/json",
            
        }}
        yield call(() => axiosInstance.post({ word }))
        yield workGetCardsFetch()
    } catch (error) {
        console.log(error.message)
    }
}

// function* createUser(action){
//     try {
//         const user = action.payload
//         const options = {
        // headers: { 
        //     "content-type": "application/json",
        //     
        // }}
//         yield call(() => axios.post('http://127.0.0.1:8000/users/'), {user}, options )
//     } catch (error) {
//         console.log(error.message)
//     }
// }

function* updateCard(action) {
    const word = action.payload
    const options = {
        headers: { 
        "content-type": "application/json",
        
    }}
    try {
        yield call(() => axios.patch(`http://127.0.0.1:8000/words/${word.id}/`, { word }, options))
        const words = yield select(state => state.show.cards)
        const testingGetCards = getCardsSuccess(words)
        yield put(testingGetCards)
    } catch (error) {
        console.log(error.message)
    }
}

function* deleteCard(action) {
    const word = action.payload
    const options = {
        headers: { 
        "content-type": "application/json",
        
    }}
    try {
        yield call(() => axios.delete(`http://127.0.0.1:8000/words/${word.id}/`, { word }, options))
    } catch (error) {
        console.log(error.message)
    }
}
function* cardsSaga() {
    yield takeEvery('cards/getCardsFetch', workGetCardsFetch)
    yield takeEvery('cards/newCardPost', workCreateCard)
    // yield takeEvery('cards/newUserPost', createUser)
    yield takeEvery('cards/updateCardSuccess', updateCard)
    yield takeEvery('cards/deleteCardSuccess', deleteCard)
}
export default cardsSaga