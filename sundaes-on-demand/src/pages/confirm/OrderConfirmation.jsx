import { useEffect, useState } from 'react'
import { useOrderDetails } from '../../context/OrderDetails'
import axios from 'axios'

export default function OrderConfirmation({setOrderPhase}){
  const [orderNumber, setOrderNumber] = useState(null)
  const {resetOrder} = useOrderDetails()

  useEffect(()=> {
    axios.post('http://localhost:3030/order').then((response) => {
       setOrderNumber(response?.data?.orderNumber)
    }).catch(error => {

    })
  },[])

  function handleClick(){
     resetOrder()
     setOrderPhase('inProgress')
  }
   return (
    orderNumber ?
    <div style={{textAlign: 'center'}}>
     <h1>Thank You!</h1>
     <p>Your order number is {orderNumber}</p>
     <p>as per now, there is no terms and conditions</p>
     <button onClick={handleClick}>Create New Order</button>
     </div> :
     <div> Loading </div>
   )
}