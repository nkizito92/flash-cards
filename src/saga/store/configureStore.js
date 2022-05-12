import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import cardReducer from '../reducers/cardReducer'
import cardsSaga from '../requests/cardsSaga'



const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: { show: cardReducer },
    middleware: [sagaMiddleware]
});
sagaMiddleware.run(cardsSaga)
// add a watchSage

export default store;