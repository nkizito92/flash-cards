import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
const CardShow = ({ cards }) => {
    const params = useParams()
    const card = cards.find(card => card.id === Number(params.id))
    const [cardDef, setCardDef] = useState("")
    const [simAns, setSimAns] = useState("")
    const [answer, setAnswer] = useState("")
    const [isPass, setIsPass] = useState("")
    const cardDefinition = (definition = "You are displaying the definition") => {
        // take definition from card and compare it to user own defintion
        // click to go to next and back as well
        const theAnswer = definition.toLowerCase().split(" ")
        const isAnswer = () => {
            const results = theAnswer.map(word => answer.toLowerCase().split(" ").includes(word))
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
            console.log(common)
            setIsPass(common.true > common.false)
            return common.true > common.false
        }
        if (!!isAnswer()) {
            setCardDef("You are displaying the definition")
            setSimAns(answer)
        } else {
            setCardDef("That is not correct")
        }
    }
    if (card) {
        return (
            <div>
                <h2> This is CardShow</h2>
                <h3>{card.full_name}</h3>
                {answer && <div>{cardDef}</div>}
                {isPass && <div>Your answer: {answer} ✅</div>}
                <input type="text" onChange={e => setAnswer(e.target.value)} value={answer} />
                <button onClick={() => cardDefinition()}>View Definition</button>
                <Link to={`/cards/${params.id}/edit`} >Edit Card</Link>
                {isPass && <div><Link onClick={() => setCardDef("")} to={`/cards/${Math.floor(Math.random() * 41) + 1}`}> Next</Link></div>}
            </div>
        )
    }
}

export default CardShow