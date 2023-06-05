import React from 'react'
import { useOrderDetails } from '../../context/OrderDetails';
import { formatCurrency } from '../../utilities';
import SummaryForm from './SummaryForm';

export default function OrderSummary({setOrderPhase}){
const {totals, optionCounts} = useOrderDetails();

const scoopArray = Object.entries(optionCounts['scoops'])
const scoopList = scoopArray.map((key, value) => {
  return <li key={key}>{value} {key}</li>
})
const toppingsArray = Object.keys(optionCounts['toppings'])
const toppingsList = toppingsArray.map(key => <li key={key}>{key}</li>)

const hasToppings = totals.toppings > 0

return(<div>
  <h1>Order Summary</h1>
  <p>Scoops: {formatCurrency(totals('scoops'))}</p>
  <ul>{scoopList}</ul>
  {hasToppings ? <><p>Toppings: {formatCurrency(totals('toppings'))}</p>
  <ul>{toppingsList}</ul></> : null}
  <SummaryForm setOrderPhase={setOrderPhase}/>
</div>)

}