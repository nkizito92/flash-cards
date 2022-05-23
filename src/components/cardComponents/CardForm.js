import React, {useState} from "react"
import { useDispatch, connect } from "react-redux"
import { newCardPost } from "../../saga/reducers/cardReducer"
const CardForm = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [id, setId] = useState("")
    function handleSubmit(e) {
        e.preventDefault()
        const newClient = {
            full_name : name,
            pay_rate: price,
            driver_id: id
        }
        dispatch(newCardPost(newClient))
    }
    return (
        <div>
            This is CardsForm 
            <form >
                <div>
                <input type="text" name="driver_id"
                    onChange= {e=> setId(e.target.value)} value={id} placeholder="id"/>

                </div>
                <div>
                <input type="text" name="full_name"
                     onChange={(e)=>setName(e.target.value)} value={name}   placeholder="full_name"/>

                </div>
                <div>
                <input type="text" name="pay_rate"
                     onChange={e =>setPrice(e.target.value)} value={price}  placeholder="pay_rate" />

                </div>
                <button onClick={e=>handleSubmit(e)}>Create Card</button>
            </form>
        </div>
    )
}
export default connect(null,{newCardPost})(CardForm)