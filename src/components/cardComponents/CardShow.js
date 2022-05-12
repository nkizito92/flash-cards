import { useState } from "react"
import { useParams } from "react-router-dom"
const CardShow = ({ cards }) => {
    const params = useParams()
    const card = cards.find(card => card.id === Number(params.id))
    const [cardDef, setCardDef] = useState("")
    const [answer, setAnswer] = useState("")
    const cardDefinition = (definition) => {
        // take def from card and compare it to user version
        // click to go to next and back as well
        const theAnswer = "You are displaying the definition"
        theAnswer.split("")
        if (theAnswer.includes(answer)) {
            setCardDef("You are displaying the definition")
        } else {
            setCardDef("That is not correct")
        }
    }
    return (
        <div>
            <h2> This is CardShow</h2>
            {card && <h3>{card.full_name}</h3>}
            <div>{cardDef}</div>
            <input type="text" onChange={e => setAnswer(e.target.value)} value={answer} />
            <button onClick={() => cardDefinition()}>View Definition</button>
        </div>
    )
}

export default CardShow