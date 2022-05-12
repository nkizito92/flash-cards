import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getCardsFetch } from './saga/reducers/cardReducer'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCardsFetch())
  }, [dispatch])
  const cards = useSelector(state => state.reducer.cards)
  console.log(cards)
  return (
    <div className="App">
      Hi
    </div>
  );
}

export default App;
