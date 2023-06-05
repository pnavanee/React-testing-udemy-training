import userEvent  from '@testing-library/user-event'
import {render, screen } from '../../../test-utils/testing-library-util'
import ScoopOoption from '../ScoopOption'

test('check whether the scoop option value is valid', async ()=>{
   const user = userEvent.setup()
   render(<ScoopOoption/>)
   const vanillaInput = await screen.findByRole('spinbutton')
   await user.clear(vanillaInput)
   await user.type(vanillaInput, "-1")
   expect(vanillaInput).toHaveClass('is-invalid')

   await user.clear(vanillaInput)
   await user.type(vanillaInput, '2.5')
   expect(vanillaInput).toHaveClass('is-invalid')

   await user.clear(vanillaInput)
   await user.type(vanillaInput, "11")
   expect(vanillaInput).toHaveClass('is-invalid')

   await user.clear(vanillaInput)
   await user.type(vanillaInput, "3")
   expect(vanillaInput).not.toHaveClass('is-invalid')

})