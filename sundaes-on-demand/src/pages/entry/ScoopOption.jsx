import { Col, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useOrderDetails } from '../../context/OrderDetails'
import { useState } from 'react'

export default function ScoopOoption({name, imagePath}){
    const { updateOptionItem } = useOrderDetails()
    const [isValid, setIsValid] = useState(true)

    function handleChange(e) {
       const currentValue = parseFloat(e.target.value);
       const isValid = currentValue >= 0 && currentValue <= 10 && Math.floor(currentValue) === currentValue
       setIsValid(isValid);

       const value = isValid ? parseInt(e.target.value) : 0;
       if(isValid)
       updateOptionItem(name, value, 'scoops')
    }

  return <div>
         <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`}/>
         <FormGroup controlId={`${name}-count`} as={Row} style={{marginTop: '10px'}}>
            <FormLabel column xs='6' style={{textAlign: 'right'}}>
                 {name}
            </FormLabel>
            <Col xs="5" style={{textAlign: 'left'}}>
                <FormControl type="number" defaultValue={0} onChange={handleChange} isInvalid={!isValid}></FormControl>
            </Col>
         </FormGroup>
        </div>
}