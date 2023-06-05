import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export const replaceCamelcaseWithSpace = colorName => colorName.replace(/\B([A-Z])\B/g, ' $1')

function App() {
  const [color, setColor] = useState('MediumVioletRed')
  const newColor = color === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed'
  const [buttonDisabled, setButtonDisabled] = useState(false)


  const ChangeButton = () => {
       setColor(newColor)
  }

  return (
    <div>
       <button style={{backgroundColor: buttonDisabled ? 'grey' : color}} onClick={ChangeButton} disabled={buttonDisabled}>Change to {newColor}</button>
       <input type="checkbox" id="disable-button-checkbox" onChange={() => setButtonDisabled(!buttonDisabled)}/>
       <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
