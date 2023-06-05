import { render, screen } from '../test-utils/testing-library-util'
import App from '../App'
import userEvent from '@testing-library/user-event'


test('order phases for happy path', async () => {
   const user = userEvent.setup();
   render(<App/>)

   const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
   await user.clear(vanillaInput);
   await user.type(vanillaInput, "1")

   const chocolateInput = screen.getByRole('spinbutton', {name: 'Chocolate'})
   await user.clear(chocolateInput)
   await user.type(chocolateInput, "2")

   const cherriesCheckBox = await screen.findByRole('checkbox', {name: 'Cherries'})
   await user.click(cherriesCheckBox)

   const orderSummaryButton = screen.getByRole('button', {name: /order sundae/i})
   await user.click(orderSummaryButton)

   const orderSummary = screen.getByRole('heading', {name: 'Order Summary'});
   expect(orderSummary).toBeInTheDocument()

   const scoopsHeading = screen.getByRole('heading', {name: 'Scoops total: $6.00'})
   expect(scoopsHeading).toBeInTheDocument()

   const toppingHeading = screen.getByRole('heading', {name: 'Toppings: $1.50'})
   expect(toppingHeading).toBeInTheDocument()

   expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
   expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
   expect(screen.getByText('Cherries')).toBeInTheDocument()

   const termsCheckbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
   await user.click(termsCheckbox)

   const confirmOrderButton = screen.getByRole('button', {name: /confirm order/i})
   await user.click(confirmOrderButton)

   const loading = screen.getByText(/loading/i)
   expect(loading).toBeInTheDocument()

   const thankYouHeader = await screen.findByRole('heading', {name: /thank you/i})
   expect(thankYouHeader).toBeInTheDocument()

   const notLoading = screen.queryByText(/loading/i)
   expect(notLoading).not.toBeInTheDocument()

   const orderNumber = await screen.findByText(/order number/i)
   expect(orderNumber).toBeInTheDocument()

   const newOrder = screen.getByRole('button', {name: /new order/i});
   await user.click(newOrder)

   const scoopsTotal = await screen.findByText('Scoops total: $0.00')
   expect(scoopsTotal).toBeInTheDocument()

   const toppingsTotal = screen.getByText('Toppings total: $0.00')
   expect(toppingsTotal).toBeInTheDocument()

   await screen.findByRole('spinbutton', {name: 'Vanilla'})
   await screen.findByRole('checkbox', {name: 'Cherries'})

})


test("no toppings display", async () => {
  const user = userEvent.setup()
  render(<App/>)
  const vanillaInput = await screen.findByRole('spinbutton', {name: 'Vanilla'})
  await user.clear(vanillaInput)
  await user.type(vanillaInput, "1")

  const chocolateInput = screen.getByRole('spinbutton', {name: 'Chocolate'})
  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")

  const orderSummaryButton = screen.getByRole('button', {name: /order sundae/i})
  await user.click(orderSummaryButton)

  const scoopsHeading = screen.getByText('Scoops total: $6.00')
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.queryByRole('heading', {name: /toppings/i})
  expect(toppingsHeading).not.toBeInTheDocument()

})