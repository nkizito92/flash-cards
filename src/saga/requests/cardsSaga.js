import {call, put, takeEvery} from 'redux-saga/effects'
import { getCardsSuccess } from '../reducers/cardReducer'
import axios from 'axios';

function* workGetCardsFetch() {
    const cards = yield call( () => fetch('http://localhost:3001/clients'))
    const formattedCards = yield cards.json();
    yield put(getCardsSuccess(formattedCards))
}

function* workCreateCard(action) {
    try {

        const client = action.payload
        yield call( ()=> axios.post('http://localhost:3001/clients', {client}))
    } catch(error){
        console.log(error.message)
    }
}

function* updateCard(action) {
    const client = action.payload
    try {
        yield call (() => axios.patch(`http://localhost:3001/clients/${client.id}`, {client}))
    } catch (error) {
        console.log(error.message)
    }
}

function* deleteCard(action) {
    const client = action.payload
    try {
        yield call (() => axios.delete(`http://localhost:3001/clients/${client.id}`, {client}))
    } catch (error) {
        console.log(error.message)
    }
}
function* cardsSaga(){
    yield takeEvery('cards/getCardsFetch', workGetCardsFetch)
    yield takeEvery('cards/newCardPost', workCreateCard)
    yield takeEvery('cards/updateCardSuccess', updateCard)
    yield takeEvery('cards/deleteCardSuccess', deleteCard)
}
export default cardsSaga