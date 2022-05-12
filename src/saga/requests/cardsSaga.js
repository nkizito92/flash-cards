import {call, put, takeEvery} from 'redux-saga/effects'
import { getCardsSuccess } from '../reducers/cardReducer'


function* workGetCardsFetch() {
    const cards = yield call( () => fetch('http://localhost:3001/clients'))
    const formattedCards = yield cards.json();
    yield put(getCardsSuccess(formattedCards))
}

function* cardsSaga(){
    yield takeEvery('cards/getCardsFetch', workGetCardsFetch)
}
export default cardsSaga