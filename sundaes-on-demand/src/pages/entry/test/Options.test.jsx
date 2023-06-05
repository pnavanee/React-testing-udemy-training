import userEvent  from '@testing-library/user-event';
import {render, screen} from '../../../test-utils/testing-library-util'
import Options from '../Options'

test('display scoop images from the server', async () => {
   render(<Options optionType="scoops"/>)
   const scoopImages = await screen.findAllByRole('img', {name: /scoop$/i});
   expect(scoopImages).toHaveLength(2)
   const altText = scoopImages.map(img => img.alt);
   expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('display topping images from the server', async () => {
  render(<Options optionType="toppings"/>)
  const toppingImages = await screen.findAllByRole('img', {name: /topping$/i})
  expect(toppingImages).toHaveLength(3)
  const altText = toppingImages.map(img => img.alt)
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping'])
})

test('display scoops total as 0 for invalid input', async ()=>{
   const user = userEvent.setup()
   render(<Options optionType='scoops'/>)
   const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
   await user.clear(vanillaInput);
   await user.type(vanillaInput, "-1")
   const scoopTotal = screen.getByText("Scoops total: $0.00");
   expect(scoopTotal).toBeInTheDocument()

})