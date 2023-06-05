import { render, screen, logRoles, fireEvent } from '@testing-library/react';
import { replaceCamelcaseWithSpace } from './App'
import App from './App';

test('check whether button initial color is blue', () => {
  const { container } = render(<App />)
  logRoles(container)
  const button = screen.getByRole('button', { name: 'Change to MidnightBlue' })
  expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
  fireEvent.click(button)
  expect(button).toHaveStyle({ backgroundColor: 'MidnightBlue' })
  expect(button.textContent).toBe('Change to MediumVioletRed')
})

test('intital conditions', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: 'Change to MidnightBlue' })
  expect(button).toBeEnabled()
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('toggle button', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRol('button', { name: 'Change to MidnightBlue' })
  fireEvent.click(checkbox)
  expect(button).toBeDisabled()
  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
})

test('button color disabled', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to MidnightBlue' })

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ 'background-color': 'grey' })

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ 'background-color': 'MediumVioletRed' })
})

test('button disable after change color', () => {
  render(<App></App>)
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const button = screen.getByRole('button', { name: 'Change to MidnightBlue' })
  fireEvent.click(button)

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ 'background-color': 'grey' })

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ 'background-color': 'MidnightBlue' })
})

describe('separate camelcase letters with space', () => {
  test('case 1', () => {
    expect(replaceCamelcaseWithSpace('Medium Violet Red')).toBe(
      'Medium Violet Red'
    )
  })
  test('case 2', () => {
    expect(replaceCamelcaseWithSpace('MidnightBlue')).toBe('Midnight Blue')
  })
  test('case 3', () => {
    expect(replaceCamelcaseWithSpace('MediumVioletRed')).toBe(
      'Medium Violet Red'
    )
  })
})