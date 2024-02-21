import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Dropdown } from '../../components/atoms/Dropdown'

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
      <Dropdown defaultValue="Test selected value">
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

  it('renders the selected value in the DropdownHeader on initial load', () => {
    render(
      <Dropdown defaultValue="Preselected Item">
        <p data-value="Preselected Item">Preselected Item</p>
        <p data-value="Item 2">Item 2</p>
      </Dropdown>
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')
    expect(dropdownHeader).toHaveTextContent('Preselected Item')
  })

  const MockParent = () => {
    const [selectedOption, setSelectedOption] = useState('')

    const handleChange = (value: string) => {
      console.log(value)
      setSelectedOption(value)
    }

    return (
      <div>
        <Dropdown onValueChange={handleChange}>
          <p data-value="Option 1">Option 1</p>
          <p data-value="Option 2">Option 2</p>
        </Dropdown>
        <p data-testid="selected-value">{selectedOption}</p>
      </div>
    )
  }

  it('passes selected option to parent via onChange', async () => {
    render(<MockParent />)
    const dropdownHeader = screen.getByTestId('dropdown-header')
    await userEvent.click(dropdownHeader)

    const optionToSelect = screen.getByText('Option 2')
    await userEvent.click(optionToSelect)

    await waitFor(() => {
      expect(screen.getByTestId('selected-value')).toHaveTextContent('Option 2')
    })
  })
})
