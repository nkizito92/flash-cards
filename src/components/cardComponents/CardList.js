import React from 'react'
import { Link } from 'react-router-dom'
const Cards = ({cards}) => {
    return (
        <div>
           <h1>Select a Card</h1> 
            {cards && cards.map(card => 
            <div key={`cardsKeing-${card.id}`}>
                <Link to={`/cards/${card.id}/`}>View {card.name}</Link>
            </div>)}
        </div>
    )
}

export default Cards