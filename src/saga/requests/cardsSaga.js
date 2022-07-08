import { call, put, takeEvery, select } from 'redux-saga/effects'
import { getCardsSuccess } from '../reducers/cardReducer'
import axios from 'axios';

function* workGetCardsFetch() {
    // const cards = yield call(() => fetch('http://127.0.0.1:8000/'))
    // const formattedCards = yield cards.json();
    const cards = yield call(() => axios.get('http://127.0.0.1:8000/'))
    yield put(getCardsSuccess(cards.data))
}

function* workCreateCard(action) {
    try {
        const word = action.payload
        const options = {headers: { "content-type": "application/json" }}
        yield call(() => axios.post('http://127.0.0.1:8000/', { word }, options))
        yield workGetCardsFetch()
    } catch (error) {
        console.log(error.message)
    }
}

function* updateCard(action) {
    const word = action.payload
    const options = {
        headers: { "content-type": "application/json" }
    }
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
        headers: { "content-type": "application/json" }
    }
    try {
        yield call(() => axios.delete(`http://127.0.0.1:8000/words/${word.id}/`, { word }, options))
    } catch (error) {
        console.log(error.message)
    }
}
function* cardsSaga() {
    yield takeEvery('cards/getCardsFetch', workGetCardsFetch)
    yield takeEvery('cards/newCardPost', workCreateCard)
    yield takeEvery('cards/updateCardSuccess', updateCard)
    yield takeEvery('cards/deleteCardSuccess', deleteCard)
}
export default cardsSaga