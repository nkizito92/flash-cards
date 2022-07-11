import React from 'react'
import { Link } from 'react-router-dom'
const Cards = ({cards}) => {
    const cardsList = cards && cards.map(card =>
        <div key={`cardsKeing-${card.id}`}>
            <Link to={`/cards/${card.id}/`}>View {card.name}</Link>
        </div>)
    return (
        <div>
           <h1>Select a Card</h1> 
            {cardsList}
        </div>
    )
}

export default Cards