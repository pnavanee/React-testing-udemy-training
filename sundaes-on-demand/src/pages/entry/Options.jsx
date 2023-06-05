import { useEffect, useState } from 'react'
import ScoopOoption from './ScoopOption'
import axios from 'axios'
import ToppingOption from './ToppingOption'
import AlertBanner from '../common/AlertBanner'
import { PricePerItem } from '../../constants'
import { formatCurrency } from '../../utilities'
import { useOrderDetails } from '../../context/OrderDetails'

export default function Options({optionType = 'scoops'}){
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const {totals} = useOrderDetails()

  useEffect(()=>{
    const controller = new AbortController()
    axios.get(`http://localhost:3030/${optionType}`, {
      signal: controller.signal
    }).then(res => setItems(res.data))
    .catch(err => {  if(err.name !== 'CanceledError') setError(true) })

    return () => {
       controller.abort();
    }
  }, [optionType])

  if(error){
     return <AlertBanner message={error}></AlertBanner>
  }

  const ItemComponent = optionType === 'scoops' ? ScoopOoption : ToppingOption;

  const scoopOptions = items.map(item => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}></ItemComponent>)
  const title = optionType[0]?.toUpperCase() + optionType?.slice(1)?.toLowerCase()

  return <div>
    <h3>{title}</h3>
    <p>{formatCurrency(PricePerItem[optionType])} each</p>
    <p>{title} total: {formatCurrency(totals[optionType])}</p>
    {scoopOptions}
    </div>

}