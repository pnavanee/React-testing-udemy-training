import {screen, render} from '../../../test-utils/testing-library-util'
import userEvent from '@testing-library/user-event'
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('display subtotal for icecream scoop', async () => {
   const user = userEvent.setup()
   render(<Options optionType="scoops"></Options>)
   const scoopSubTotal = screen.getByText('Scoops total: $', {exact: false});
   expect(scoopSubTotal).toHaveTextContent('0.00');

   const spinInput = await screen.findByRole('spinbutton', {name: 'Vanilla'});
   await user.clear(spinInput);
   await user.type(spinInput, '1');
   expect(scoopSubTotal).toHaveTextContent('2.00')

   const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'})
   await user.clear(chocolateInput);
   await user.type(chocolateInput, '2')
   expect(scoopSubTotal).toHaveTextContent('6.00')
})

test('display subtotal for toppings', async () => {
   const user = userEvent.setup();
   render(<Options optionType="toppings"></Options>)
   const toppingsTotal = screen.getByText('Toppings total: $', {exact: false});
   expect(toppingsTotal).toHaveTextContent('0.00')

   const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'})
   await user.click(cherriesCheckBox)
   expect(toppingsTotal).toHaveTextContent('1.50')

   const hotFudgeCheckbox = await screen.findByRole('checkbox', {name: 'Hot fudge'})
   await user.click(hotFudgeCheckbox)
   expect(toppingsTotal).toHaveTextContent('3.00')

   await user.click(hotFudgeCheckbox)
   expect(toppingsTotal).toHaveTextContent('1.50')
})

describe('grand total', () => {
   test('grand total starts at $0.00', () => {
      const {unmount} = render(<OrderEntry/>)
      const grandTotal = screen.getByRole('heading', {name: /Grand Total: \$/i})
      expect(grandTotal).toHaveTextContent('0.00')
      unmount();
   })
   test('grand total updates properly if scoop is added first', async() => {
      const user = userEvent.setup();
      render(<OrderEntry/>)
      const grandTotal = screen.getByRole('heading', {name: /Grand Total: \$/i})
      const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})

      await user.clear(vanillaInput)
      await user.type(vanillaInput, "2")
      expect(grandTotal).toHaveTextContent('4.00')

      const cherriesCheckbox = await screen.findByRole('checkbox', {name: 'Cherries'})
      await user.click(cherriesCheckbox)
      expect(grandTotal).toHaveTextContent('5.50')


   })
   test('grand total updates properly if topping is added first', async () => {
      const user = userEvent.setup();
      render(<OrderEntry/>)
      const grandTotal = screen.getByRole('heading', {name: /Grand Total: \$/i})

      const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'})
      await user.click(cherriesCheckBox);
      expect(grandTotal).toHaveTextContent('1.50')

      const vanillaInput = await screen.findByRole('spinbutton',  {name: 'Vanilla'})
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "2")
      expect(grandTotal).toHaveTextContent('5.50')
   })

   test('grand total updates if item is removed', async () => {
      const user = userEvent.setup();
      render(<OrderEntry/>)

      const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'})
      await user.click(cherriesCheckBox)

      const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
      await user.clear(vanillaInput)
      await user.type(vanillaInput, "2")

      await user.clear(vanillaInput)
      await user.type(vanillaInput, "1")

      const grandTotal = screen.getByRole("heading", {name: /Grand Total: \$/i})
      expect(grandTotal).toHaveTextContent('3.50')

      await user.click(cherriesCheckBox)
      expect(grandTotal).toHaveTextContent('2.00')


   })
})