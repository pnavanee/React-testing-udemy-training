import { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Form } from 'react-bootstrap';

export default function SummaryForm({setOrderPhase}){
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>
       No ice cream will actually be delivered
    </Popover.Body>
  </Popover>
);

const Example = (
  <span>
    I agree to
  <OverlayTrigger placement="right" overlay={popover}>
         <span style={{color: 'blue'}}>Terms and Conditions</span>
     </OverlayTrigger>
    </span>
);

  return <div>
     <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          onChange={(e) => setButtonDisabled(!e.target.checked)}
          label={Example}
        />
      </Form.Group>
       <button disabled={buttonDisabled} onClick={() => setOrderPhase('completed')}>Confirm Order</button>
     </Form>
  </div>
}

