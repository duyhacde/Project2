import React, {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
function OrderDetails() {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [isAdmin] =state.userAPI.isAdmin
    const [orderDetails, setOrderDetails] = useState([])
    const [status,setStatus]=useState('')
    const params = useParams()
    const [token] = state.token
    useEffect(() => {
        console.log(history)
        if(params.id){
            history.forEach(item =>{
                if(item._id === params.id) setOrderDetails(item)
            })
        }
    },[params.id, history])

    const handleChange=(e)=>{
        setStatus(e.target.value);
        console.log(status)
    }
    const onUpdate=async()=>{
        try{
             await axios.put(`/api/order/${params.id}`,{status},{
                headers: {Authorization: token}
            })
        }
        catch(err){
            alert(err);
        }
    }
    if(orderDetails.length === 0) return null;

    return (
        <div className="history-page">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Mã đơn</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.name}</td>
                        <td>{orderDetails.address}</td>
                        <td>{params.id}</td>
                        <td>{isAdmin?<select onChange={handleChange}>
                            <option>{orderDetails.status}</option>
                        {orderDetails.status==='pending'?<><option>transporting</option>
                            <option>completed</option></>:orderDetails.status==='transporting'?<><option>pending</option>
                            <option>completed</option></>:<><option>pending</option>
                            <option>transporting</option></>}   
                            
                            </select>:orderDetails.status}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{margin: "30px 0px"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.cart.map(item =>(
                        <tr key={item._id}>
                            <td><img src={item.images.url} alt="" /></td>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price * item.quantity}.000đ</td>
                        </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            {isAdmin?<div className='update'>
                <button onClick={onUpdate}>Update</button>
            </div>:<></>}
            
        </div>
    )
}

export default OrderDetails