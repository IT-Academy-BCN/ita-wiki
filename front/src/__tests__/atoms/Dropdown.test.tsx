import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Dropdown } from '../../components/atoms'

describe('Dropdown', () => {
  it('renders correctly', () => {
    render(
      <Dropdown>
        <p>Test children content</p>
      </Dropdown>
    )

    const dropdown = screen.getByTestId('dropdown')
    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdown).toBeInTheDocument()
    expect(dropdown).toHaveStyle(`cursor: pointer;`)
    expect(dropdownHeader).toHaveTextContent(/selecciona/i)
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Cerrar')).not.toBeInTheDocument()
  })

  it('renders dropdown children when user clicks on it', async () => {
    render(
      <Dropdown>
        <p>Test children content</p>
      </Dropdown>
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(screen.queryByText('Test children content')).not.toBeInTheDocument()

    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()
    await userEvent.click(dropdownHeader)

    expect(screen.queryByText('Test children content')).toBeVisible()
    expect(screen.getByTitle('Cerrar')).toBeInTheDocument()
  })

  it('renders placeholder provided instead of default', () => {
    render(
      <Dropdown placeholder="Test placeholder">
        <p>Test children content</p>
      </Dropdown>
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/Test placeholder/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)
  })

  it('renders value provided instead of placeholder', () => {
    render(
      <Dropdown selectedValue="Test selected value">
        <p>Test children content</p>
      </Dropdown>
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/Test selected value/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)
  })

  it('a click outside the dropdown closes its menu', async () => {
    render(
      <Dropdown>
        <p>Test children content</p>
      </Dropdown>
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    await userEvent.click(dropdownHeader)
    expect(screen.getByText('Test children content')).toBeVisible()

    await userEvent.click(document.body)
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument()
  })
})
