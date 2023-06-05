import React from 'react'
import Options from './Options'
import { useOrderDetails } from '../../context/OrderDetails'
import { formatCurrency } from '../../utilities'

export default function OrderEntry({setOrderPhase}){
  const {totals} = useOrderDetails()
  const orderDisabled = totals.scoops === 0
  return <div>
     <Options optionType="scoops"></Options>
     <Options optionType="toppings"></Options>
     <h1>Grand Total: {formatCurrency(totals.scoops + totals.toppings)}</h1>
     <button disabled={orderDisabled} onClick={()=>setOrderPhase('revview')}>Order sundae!</button>
  </div>
}