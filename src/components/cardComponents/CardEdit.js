import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from 'react-router-dom'
import { deleteCardSuccess, updateCardSuccess } from "../../saga/reducers/cardReducer"
const CardEdit = ({ cards }) => {
    const navigation = useNavigate()
    const params = useParams()
    const card = cards.find(card => card.id === Number(params.id))
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [id, setId] = useState("")
    function handleSubmit(e) {
        e.preventDefault()
        const clientToUpdate = {
            id: Number(params.id),
            full_name: name,
            pay_rate: price,
            driver_id: id
        }
        dispatch(updateCardSuccess(clientToUpdate))
        navigation(`/cards/${params.id}`)
    }
    function handleDelete(e) {
        e.preventDefault()
        const clientToDelete = {
            id: Number(params.id),
            full_name: name,
            pay_rate: price,
            driver_id: id
        }
        dispatch(deleteCardSuccess(clientToDelete))
        navigation("/")
    }
if(card){
    return (
        <div>
            This is Card Edit
            <form >
                <div>
                   <div>ID</div> 
                   <input type="text" name="driver_id"
                        onChange={e => setId(e.target.value)} value={id} placeholder={params.id} />

                </div>
                <div>
                    <div>Full Name</div> 
                    <input type="text" name="full_name"
                        onChange={(e) => setName(e.target.value)} value={name} placeholder={card.full_name} />

                </div>
                <div>
                   <div>Pay Rate</div>
                    <input type="text" name="pay_rate"
                        onChange={e => setPrice(e.target.value)} value={price} placeholder={card.pay_rate} />

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