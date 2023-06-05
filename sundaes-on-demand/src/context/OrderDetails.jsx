import { createContext, useContext, useState } from 'react';
import { PricePerItem } from '../constants';


const OrderDetails = createContext();

export function useOrderDetails() {
   const context = useContext(OrderDetails)
   if(!context){
      throw Error("Use order details context inside order details provider")
   }

   return context
}

export function OrderDetailsProvider(props) {
   const [optionsCount, setOptionsCount] = useState({
    scoops: {},
    toppings: {}
   })


   function updateOptionItem(itemName, count, optionType) {
      const newOptionsCount = {...optionsCount}
      newOptionsCount[optionType][itemName] = count
      setOptionsCount(newOptionsCount)
   }

    function calculateTotal(optionType){
      const countsArray = Object.values(optionsCount[optionType])
      const total = countsArray.reduce((total,value) => total+value, 0)
      return total * PricePerItem[optionType]
    }

    function resetOptions() {
      setOptionsCount({scoops: {}, toppings: {}})
    }

    const totals = {
      scoops: calculateTotal('scoops'),
      toppings: calculateTotal('toppings')
    }

    const value = {updateOptionItem, totals, optionsCount, resetOptions }

    return <OrderDetails.Provider value={value} {...props}></OrderDetails.Provider>
}