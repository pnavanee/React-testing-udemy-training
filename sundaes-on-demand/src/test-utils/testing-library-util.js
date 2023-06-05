import { render } from '@testing-library/react'
import { OrderDetailsProvider } from '../context/OrderDetails'

const renderWithContext = (Component, options) => {
  return render(Component, { wrapper: OrderDetailsProvider, ...options })
}

export * from '@testing-library/react'

export { renderWithContext as render }
