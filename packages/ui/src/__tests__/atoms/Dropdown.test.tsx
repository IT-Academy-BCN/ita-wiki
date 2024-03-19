import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Dropdown } from '../../components/atoms/Dropdown'


const mockOptions = [
  {
    id: '1',
    name: 'Option 1',
  },
  {
    id: '2',
    name: 'Option 2',
  },
  {
    id: '3',
    name: 'Option 3',
  },
  ]

describe('Dropdown', () => {
  it('renders correctly', async () => {
    render(
      <Dropdown options={mockOptions} />
    )

    const dropdown = screen.getByTestId('dropdown')
    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdown).toBeInTheDocument()
    expect(dropdown).toHaveStyle(`cursor: pointer;`)
    expect(dropdownHeader).toHaveTextContent(/selecciona/i)
    await userEvent.click(dropdownHeader)
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Cerrar')).not.toBeInTheDocument()
  })

  it('renders dropdown children when user clicks on it', async () => {
    render(
      <Dropdown options={mockOptions} />
    )
    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(screen.queryByText('Test children content')).not.toBeInTheDocument()
    
    await userEvent.click(dropdownHeader)
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()
    
    expect(screen.queryByText('Option 1')).toBeVisible() 
    await userEvent.click(dropdownHeader)
  
    expect(screen.getByTitle('Cerrar')).toBeInTheDocument()
  })

  it('renders placeholder provided instead of default', () => { 
    render(
      <Dropdown placeholder="Test placeholder" options={mockOptions} />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/Test placeholder/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)
  })

  it('renders value provided instead of placeholder', async () => {
    render(
      <Dropdown defaultValue="Test selected value" options={mockOptions} />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/Test selected value/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)
    
  })

  it('a click outside the dropdown closes its menu', async () => {
    render(
      <Dropdown options={mockOptions} />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(screen.queryByText('Test children content')).not.toBeInTheDocument()
    
    await userEvent.click(dropdownHeader)
    expect(screen.getByText('Option 1')).toBeVisible()

    await userEvent.click(document.body)
    expect(screen.queryByText('Test children content')).not.toBeInTheDocument()
  })

  it('renders the selected value in the DropdownHeader on initial load', () => {
    render(
      <Dropdown defaultValue="Preselected Item" options={mockOptions} />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')
    expect(dropdownHeader).toHaveTextContent('Preselected Item')
  })

  const MockParent = () => {
    const [selectedOption, setSelectedOption] = useState('')

    const handleChange = (value: string) => {
      setSelectedOption(value)
    }
    return (
      <div>
        <Dropdown onValueChange={handleChange} options={mockOptions} />
        <p data-testid="selected-value">{selectedOption}</p>
      </div>
    )
  }

  it('passes selected option to parent via onChange', async () => {
    render(<MockParent />)
    const dropdownHeader = screen.getByTestId('dropdown-header')
    await userEvent.click(dropdownHeader)

    const optionToSelect = screen.getByTestId('2')
    await userEvent.click(optionToSelect)

    await waitFor(() => {
      expect(screen.getByTestId('selected-value')).toHaveTextContent('2')
    })
  })
})
