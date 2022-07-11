import React, { useState} from "react"
import { useDispatch, connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { newCardPost } from "../../saga/reducers/cardReducer"
const CardForm = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [definition, setDefinition] = useState("")
    const navigation = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const newClient = {
            name: name,
            definition: definition,
        }  
        dispatch(newCardPost(newClient))
        navigation("/")
    }
    return (
        <div>
            This is CardsForm
            <form >
                <div>
                    <input type="text" name="name"
                        onChange={(e) => setName(e.target.value)} value={name} placeholder="name" />
                </div>
                <div>
                    <textarea type="textArea" name="definition" cols={50} rows={10}
                        onChange={e => setDefinition(e.target.value)} value={definition} placeholder="definition"></textarea>
                </div>
                <button onClick={e => handleSubmit(e)}>Create Card</button>
            </form>
        </div>
    )
}
export default connect(null, { newCardPost })(CardForm)