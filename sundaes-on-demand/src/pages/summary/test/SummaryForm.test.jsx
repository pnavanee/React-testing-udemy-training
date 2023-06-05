import {screen, fireEvent,render} from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event'

test('check default input of the form', () => {
   render(<SummaryForm/>)
   const button = screen.getByRole('button', {name: /confirm order/i})
   const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})
   expect(button).toBeDisabled()
   expect(checkbox).not.toBeChecked()
})

test('disable and enable button based on checkbox', async () => {
  const user = userEvent.setup()
  render(<SummaryForm/>)
  const button = screen.getByRole('button', {name: /confirm order/i})
  const checkbox = screen.getByRole('checkbox', {name: /terms and conditions/i})

  await user.click(checkbox);
  expect(button).toBeEnabled()
  await user.click(checkbox)
  expect(button).toBeDisabled()
})

test('display and hide popover', async () => {
  const user = userEvent.setup()
  render(<SummaryForm/>)
  const nullpopover = screen.queryByText(/no ice cream will actually be delivered/i)
  const tandc = screen.getByText(/terms and conditions/i)

  expect(nullpopover).not.toBeInTheDocument()
  await user.hover(tandc)
   const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()
  await user.unhover(tandc)
  expect(popover).not.toBeInTheDocument()

})