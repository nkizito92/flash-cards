//the require will load the index file from public directory and send the data to webpageConfig output property
// require('file-loader?name=[name].[ext]!../public/index.html')
import "./App.scss"
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getCardsFetch } from './saga/reducers/cardReducer'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Cards from "./components/cardComponents/Cards"
import CardForm from "./components/cardComponents/CardForm"
import CardShow from "./components/cardComponents/CardShow"
import CardEdit from "./components/cardComponents/CardEdit"
import PrivateRoute from "./components/adminComponents/PrivateRoute"
import {AuthProvider} from "./components/adminComponents/AuthContext"
import Login from "./components/adminComponents/Login"
import SignUp from "./components/adminComponents/SignUp"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() =>
  dispatch(getCardsFetch())
  , [dispatch])
  const cards = useSelector(state => state.show.cards)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AuthProvider />}>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/cards" element={<Cards cards={cards} />} />
              <Route exact path="/cards/new" element={<CardForm />} />
              <Route exact path="/cards/:id" element={<CardShow cards={cards} />} />
              <Route exact path="/cards/:id/edit" element={<CardEdit cards={cards} />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
