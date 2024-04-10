import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Dropdown, type TDropdownOption } from '../../components/atoms/Dropdown'

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

const mockOptionsWithImage = [
  {
    id: '1',
    name: 'Option 1',
    iconSvg: 'option1image.jpg',
  },
  {
    id: '2',
    name: 'Option 2',
    iconSvg: 'option2image.jpg',
  },
  {
    id: '3',
    name: 'Option 3',
    iconSvg: 'option3image.jpg',
  },
]

describe('Dropdown', () => {
  it('renders correctly', async () => {
    render(<Dropdown options={mockOptions} />)

    const dropdown = screen.getByTestId('dropdown')
    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdown).toBeInTheDocument()
    expect(dropdown).toHaveStyle(`cursor: pointer;`)
    expect(dropdownHeader).toHaveTextContent(/selecciona/i)
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    expect(screen.queryByTitle('Cerrar')).not.toBeInTheDocument()
  })

  it('renders dropdown children when user clicks on it', async () => {
    render(<Dropdown options={mockOptions} />)
    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()

    await userEvent.click(dropdownHeader)
    expect(screen.queryByText('Option 1')).toBeVisible()

    expect(screen.getByTitle('Cerrar')).toBeInTheDocument()
  })

  it('renders dropdown children with image when user clicks on it', async () => {
    render(<Dropdown options={mockOptionsWithImage} />)
    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()

    await userEvent.click(dropdownHeader)
    expect(screen.queryByText('Option 1')).toBeVisible()
    expect(screen.queryByAltText('Option 1')).toBeVisible()

    expect(screen.getByTitle('Cerrar')).toBeInTheDocument()
  })

  it('renders placeholder provided instead of default', () => {
    render(<Dropdown placeholder="Test placeholder" options={mockOptions} />)

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/Test placeholder/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)
  })

  it('renders option provided instead of placeholder', async () => {
    render(
      <Dropdown defaultSelectedOption={mockOptions[1]} options={mockOptions} />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/option 2/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)
  })

  it('renders option with image provided instead of placeholder', async () => {
    render(
      <Dropdown
        defaultSelectedOption={mockOptionsWithImage[2]}
        options={mockOptionsWithImage}
      />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')
    expect(dropdownHeader).toHaveTextContent(/option 3/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'option3image.jpg')
  })

  it('a click outside the dropdown closes its menu', async () => {
    render(<Dropdown options={mockOptions} />)

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()

    await userEvent.click(dropdownHeader)
    expect(screen.getByText('Option 1')).toBeVisible()

    await userEvent.click(document.body)
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
  })

  const MockParent = () => {
    const [selectedValue, setSelectedValue] = useState('')

    const handleChange = (selectedOption: TDropdownOption) => {
      setSelectedValue(selectedOption.name)
    }
    return (
      <div>
        <Dropdown onValueChange={handleChange} options={mockOptions} />
        <p data-testid="selected-value">{selectedValue}</p>
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
