import React, { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
const CardShow = ({cards}) => {
    const nav = useNavigate()
    const params = useParams()
    const card = cards?.find(card => card.id === Number(params.id))
    const nextCardIds = cards.map(ca => ca.id)
    const [cardDef, setCardDef] = useState("")
    const [yourAnswer, setYourAnswer] = useState("")
    const [isPass, setIsPass] = useState("")
    const [isFail, setIsFail] = useState("")
    const [lives, setLives] = useState(3)
    let cardSelectId = `/cards/${nextCardIds[Math.floor(Math.random() * cards.length)]}`
    let getTime = () =>{       
        return new Date(card.updated).toLocaleDateString('en-US', 
        {month: "long", day: "numeric", year: "numeric"})
    }
    const cardDefinition = (definition = card.definition) => {
        // take definition from card and compare it to users own definition
        // click to go to next and back as well
        const theAnswer = definition.toLowerCase().replace(/[^\w\s]/g, "").split(" ")

            const results = theAnswer.map(word => yourAnswer.toLowerCase().replace(/[^\w\s]/g, "").split(" ").includes(word))
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
            setLives(prev => prev - 1)
        }
        if(lives === 1){
            setIsFail("You've used up all your attempts... starting over!!")
            let btn = document.getElementById("checkingAnswer")
            btn.hidden = true
            setTimeout(() => {
                nav(cardSelectId)
                setLives(3)
                setIsFail("")
                btn.hidden = false
            }, 4000)
        }
    }
    if (card) {
        return (
            <div className="container is-max-desktop">
                <h1 className="title">{card.name}</h1>
                <div>{getTime()}</div>
                <h3>{lives} Attempts </h3>
                <div className="definition">
                    {isFail && <h3 className="wrong">{isFail}</h3>}
                    {isPass && <div className="correct">Your answer: {yourAnswer} ✅</div>}
                </div>
              {isPass && <div className="card">
                    <div className="card-content">
                        <div className="content"> {cardDef}</div>
                    </div>
                </div> }
               {!isPass ? <textarea className="textarea is-round" type="text" onChange={e => setYourAnswer(e.target.value)} value={yourAnswer}> </textarea> : ""} 
                <br></br><button className="button is-info" id="checkingAnswer" onClick={() => cardDefinition()}>Check Your Answer</button>
                <br></br><Link to={`/cards/${params.id}/edit`} >Edit Card</Link>
                {isPass && <div><Link onClick={() =>{
                    setYourAnswer("")
                    setIsPass(false)}} to={cardSelectId}> Next</Link></div>}
            </div>
        )
    }
}

export default CardShow