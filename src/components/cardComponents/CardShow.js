import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
const CardShow = ({ cards }) => {
    const params = useParams()
    const card = cards.find(card => card.id === Number(params.id))
    const nextCardId = cards.map(ca => ca.id)
    const [cardDef, setCardDef] = useState("")
    const [yourAnswer, setYourAnswer] = useState("")
    const [isPass, setIsPass] = useState("")
    const [isFail, setIsFail] = useState("")

    const cardDefinition = (definition = card.definition) => {
        // take definition from card and compare it to users own definition
        // click to go to next and back as well
        const theAnswer = definition.toLowerCase().replace(/[^\w\s]/g, "").split(" ")
        
            const results = theAnswer.map(word => yourAnswer.toLowerCase().replace(/[^\w\s]/g, "").split(" ").includes(word))
            console.log(theAnswer)
            const common = {
                true: 0,
                false: 0
            }
            for (let i of results) {
                if (common[i] > 0) {
                    common[i]++
                } else {
                    common[i] = 1
                }
            }
        // This will display the full definition if user is close or right
        if (common.true > common.false || common.true > 15)  {
            setCardDef(card.definition)
            setIsFail("")
            setIsPass(true)
        } else {
            setIsPass(false)
            setIsFail("That is not correct try again")
        }
    }
    if (card) {
        return (
            <div>
                <h2>{card.name}</h2>
                <div className="definition">
                    {isPass && <h3>{cardDef}</h3>}
                    {isFail && <h3 className="wrong">{isFail}</h3>}
                    {isPass && <div className="correct">Your answer: {yourAnswer} ✅</div>}
                </div>
                <textarea cols={50} rows={10} type="text" onChange={e => setYourAnswer(e.target.value)} value={yourAnswer}> </textarea>
                <br></br><button onClick={() => cardDefinition()}>Check Your Answer</button>
                <br></br><Link to={`/cards/${params.id}/edit`} >Edit Card</Link>
                {isPass && <div><Link onClick={() =>{
                    setYourAnswer("")
                    setIsPass(false)}} to={`/cards/${nextCardId[Math.floor(Math.random() * cards.length)]}`}> Next</Link></div>}
            </div>
        )
    }
}

export default CardShow