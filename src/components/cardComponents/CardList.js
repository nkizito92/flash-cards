import React from 'react'
import { Link } from 'react-router-dom'
const CardList = ({cards}) => {
    return (
        <div>
           <h1 className='title'>Select a Card</h1> 
            {cards && cards.map(card => 
            <div className='rows'>

            <div className="row" key={`cardsKeing-${card.id}`}>
                <Link className='button are-small is-info is-light mt-3' to={`/cards/${card.id}/`}>View {card.name}</Link>
            </div>
            </div>)}
        </div>
    )
}

export default CardList