import React, { useState, useContext} from "react"
import { useDispatch, connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { newCardPost } from "../../saga/reducers/cardReducer"
import AuthContext from "../adminComponents/AuthContext"
const CardForm = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [definition, setDefinition] = useState("")
    const navigation = useNavigate()
    const {contextData} = useContext(AuthContext)
    function handleSubmit(e) {
        e.preventDefault()
        const newClient = {
            user: contextData.user.username,
            name: name,
            definition: definition,
        }  
        dispatch(newCardPost(newClient))
        navigation("/cards")
    }
    return (
        <div className="container is-max-desktop">
            <h1 className="title">Create Card</h1>
            <form >
                <div>
                    <input type="text" className="input mb-3" name="name"
                        onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" />
                </div>
                <div>
                    <textarea className="textarea" type="textArea" name="definition"
                        onChange={e => setDefinition(e.target.value)} value={definition} placeholder="definition"></textarea>
                </div>
                <button className="button is-primary is mt-3" onClick={e => handleSubmit(e)}>Create Card</button>
            </form>
        </div>
    )
}
export default connect(null, { newCardPost })(CardForm)