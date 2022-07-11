import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from 'react-router-dom'
import { deleteCardSuccess, updateCardSuccess } from "../../saga/reducers/cardReducer"
const CardEdit = ({cards}) => {
    const navigation = useNavigate()
    const params = useParams()
    const card = cards.find(card => card.id === Number(params.id))
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [definition, setDefinition] = useState("")
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
            <div>
                This is Card Edit
                <form >
                    <div>
                        <div>Name</div>
                        <input type="text" name="name"
                            onChange={(e) => setName(e.target.value)} value={name} placeholder={card.name} />
                    </div>
                    <div>
                        <div>Definition</div>
                        <textarea type="text" name="definition" rows={10} cols={50}
                            onChange={e => setDefinition(e.target.value)} value={definition} placeholder={card.definition} ></textarea>

                    </div>
                    <button onClick={e => handleSubmit(e)}>Update Card</button>
                </form>
                <form>

                    <button onClick={(e) => handleDelete(e)}>Delete Client</button>
                </form>
                <Link to={`/cards/${params.id}`}>Back</Link>
            </div>
        )
    }
}

export default CardEdit