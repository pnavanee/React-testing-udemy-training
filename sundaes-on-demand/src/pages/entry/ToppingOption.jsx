import { FormCheck, FormGroup } from 'react-bootstrap';
import { useOrderDetails } from '../../context/OrderDetails';

export default function ToppingOption({name, imagePath}) {

   const {updateOptionItem} = useOrderDetails()

   function handleChange(e){
     updateOptionItem(name, e.target.checked ? 1 : 0, 'toppings')
   }

   return <div>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`}></img>
      <FormGroup controlId={`${name}-toppings checkbox`}>
           <FormCheck type="checkbox" onChange={handleChange} label={name}/>
      </FormGroup>
      </div>
}