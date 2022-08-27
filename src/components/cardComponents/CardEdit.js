import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from 'react-router-dom'
import { deleteCardSuccess, updateCardSuccess } from "../../saga/reducers/cardReducer"
const CardEdit = ({cards}) => {
    const navigation = useNavigate()
    const params = useParams()
    const card = cards.find(card => card.id === Number(params.id))
    const dispatch = useDispatch()
    const [name, setName] = useState(card.name)
    const [definition, setDefinition] = useState(card.definition)
    function handleSubmit(e) {
        e.preventDefault()
        const clientToUpdate = {
            id: Number(params.id),
            name: name,
            definition: definition,
        }
        dispatch(updateCardSuccess(clientToUpdate))
        navigation(`/cards/${params.id}`)
    }
    function handleDelete(e) {
        e.preventDefault()
        const clientToDelete = {
            id: Number(params.id),
            name: name,
            definition: definition,
        }
        dispatch(deleteCardSuccess(clientToDelete))
        navigation("/cards")
    }
    if (card) {
        return (
            <div  className="container is-max-desktop">
                <h1 className="title">This is Card Edit</h1>
                <form >
                    <div>
                        <div className="subtitle">Name</div>
                        <input type="text" name="name" className="input"
                            onChange={(e) => setName(e.target.value)} value={name} placeholder="Edit Name" />
                    </div>
                    <div>
                        <div className="subtitle mt-3">Definition</div>
                        <textarea type="text" className="textarea" name="definition" rows={10} cols={50}
                            onChange={e => setDefinition(e.target.value)} value={definition} placeholder="Edit Definition" ></textarea>

                    </div>
                    <button className="button is-success mt-3" onClick={e => handleSubmit(e)}>Update Card</button>
                </form>
                <form>

                    <button className="button is-danger mt-3" onClick={(e) => handleDelete(e)}>Delete Client</button>
                </form>
                <Link to={`/cards/${params.id}`}>Back</Link>
            </div>
        )
    }
}

export default CardEdit