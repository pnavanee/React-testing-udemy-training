import {screen, render, waitFor} from '../../../test-utils/testing-library-util'
import OrderEntry from '../OrderEntry';
import { server } from '../../../mocks/server';
import { rest } from 'msw';
import userEvent  from '@testing-library/user-event';

test('mock error response', async ()=> {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx)=>{
       return res(ctx.status(500))
    }),
    rest.get('http://localhost:3030/toppings', (req, res, ctx)=>{
      return res(ctx.status(500))
    })
  )

  render(<OrderEntry setOrderPhase={jest.fn()}/>)
    await waitFor (async () => {
     const alert = await screen.findAllByRole('alert')
     expect(alert).toHaveLength(2);
     })
  })

test('disable order button when scoop is 0',async ()=> {
    const user = userEvent.setup()
    render(<OrderEntry setOrderPhase={jest.fn()}/>)
    const orderButton = screen.getByRole('button', {name: /order sundae/i})
    expect(orderButton).toBeDisabled()

    const vanillaInput = screen.getByRole('spinbutton', {name: 'Vanilla'})
    await user.clear(vanillaInput)
    await user.type(vanillaInput, '1')
    expect(orderButton).toBeEnabled()

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "0")
    expect(orderButton).toBeDisabled()
})



