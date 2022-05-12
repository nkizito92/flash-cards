import "./App.css"
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getCardsFetch } from './saga/reducers/cardReducer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navigation from "./components/navComponents/Navigation"
import Cards from "./components/cardComponents/Cards"
import CardForm from "./components/cardComponents/CardForm"
import CardShow from "./components/cardComponents/CardShow"
import CardEdit from "./components/cardComponents/CardEdit"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCardsFetch())
  }, [dispatch])
  const cards = useSelector(state => state.show.cards)
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Cards cards={cards}/>} />
          <Route exact path="/createCard" element={<CardForm  />} />
          <Route exact path="/cards/:id" element={<CardShow cards={cards}/>} />
          <Route exact path="/cards/:id/edit" element={<CardEdit  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
