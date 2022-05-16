import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
const Cards = ({ cards }) => {
    const cardsList = cards && cards.map(card =>
        <div key={`cardsKeing-${card.id}`}><Link to={`/cards/${card.id}`}>View {card.full_name}</Link></div>)
    return (
        <div>
            This is For all Display Cards
            {cardsList}
        </div>
    )
}

export default Cards