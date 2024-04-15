import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Dropdown, type TDropdownOption } from '../../components/atoms/Dropdown'

const mockedOnValueChange = vi.fn()

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

const mockOptionsWithIcon = [
  {
    id: 'fav',
    name: 'Option Favorite',
    icon: 'favorite',
  },
  {
    id: 'close',
    name: 'Option Close',
    icon: 'close',
  },
  {
    id: 'search',
    name: 'Option Search',
    icon: 'search',
  },
]

const MockParent = () => {
  const [selectedValue, setSelectedValue] = useState('')

  const handleChange = (selectedOption: TDropdownOption | undefined) => {
    if (selectedOption) setSelectedValue(selectedOption.name)
  }
  return (
    <div>
      <Dropdown onValueChange={handleChange} options={mockOptions} />
      <p data-testid="selected-value">{selectedValue}</p>
    </div>
  )
}

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

  it('renders dropdown children with icon when user clicks on it', async () => {
    render(<Dropdown options={mockOptionsWithIcon} />)
    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(screen.queryByText('Option Favorite')).not.toBeInTheDocument()
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()

    await userEvent.click(dropdownHeader)
    expect(screen.queryByText('Option Favorite')).toBeVisible()
    const icon = screen.getByText('favorite')
    expect(icon).toHaveAttribute('name', 'favorite')
    expect(icon).toHaveClass('material-symbols-outlined')
    expect(icon).toBeVisible()

    expect(screen.getByTitle('Cerrar')).toBeInTheDocument()
  })

  it('renders placeholder provided instead of default', () => {
    render(<Dropdown placeholder="Test placeholder" options={mockOptions} />)

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/Test placeholder/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)
    expect(dropdownHeader).not.toHaveTextContent(/option 1/i)
  })

  it('renders option provided instead of placeholder', () => {
    render(
      <Dropdown
        defaultSelectedOption={mockOptions[1]}
        options={mockOptions}
        placeholder="Placeholder"
      />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/option 2/i)
    expect(screen.queryByTestId('option-image-2')).not.toBeInTheDocument()
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)

    expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument()
  })

  it('renders option with image provided instead of placeholder', () => {
    render(
      <Dropdown
        defaultSelectedOption={mockOptionsWithImage[2]}
        options={mockOptionsWithImage}
        placeholder="Placeholder"
      />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')
    expect(dropdownHeader).toHaveTextContent(/option 3/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)

    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'option3image.jpg')
    expect(image).toHaveAttribute('alt', 'Option 3')
    expect(image).toBeVisible()

    expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument()
  })

  it('renders option with icon provided instead of placeholder', () => {
    render(
      <Dropdown
        defaultSelectedOption={mockOptionsWithIcon[2]}
        options={mockOptionsWithIcon}
        placeholder="Placeholder"
      />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')
    expect(dropdownHeader).toHaveTextContent(/option search/i)
    expect(dropdownHeader).not.toHaveTextContent(/selecciona/i)

    const icon = screen.getByText('search')
    expect(icon).toHaveAttribute('name', 'search')
    expect(icon).toHaveClass('material-symbols-outlined')
    expect(icon).toBeVisible()

    expect(screen.queryByText(/placeholder/i)).not.toBeInTheDocument()
  })

  it('renders selected option in header', async () => {
    render(
      <Dropdown
        placeholder="Test placeholder"
        options={mockOptions}
        onValueChange={mockedOnValueChange}
      />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/Test placeholder/i)
    expect(dropdownHeader).not.toHaveTextContent(/option 2/i)

    await userEvent.click(dropdownHeader)

    const option2 = screen.getByText(/option 2/i)

    expect(option2).toBeInTheDocument()

    await userEvent.click(option2)

    expect(dropdownHeader).toHaveTextContent(/option 2/i)

    expect(screen.queryByText(/test placeholder/i)).not.toBeInTheDocument()

    expect(mockedOnValueChange).toHaveBeenCalledWith({
      id: '2',
      name: 'Option 2',
    })
  })

  it('a click in deselect icon deselects option', async () => {
    render(
      <Dropdown
        defaultSelectedOption={mockOptionsWithIcon[2]}
        options={mockOptionsWithIcon}
        placeholder="Placeholder"
        onValueChange={mockedOnValueChange}
      />
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')
    expect(dropdownHeader).toHaveTextContent(/option search/i)
    expect(dropdownHeader).not.toHaveTextContent(/placeholder/i)

    await userEvent.click(dropdownHeader)

    expect(screen.getAllByText(/option search/i)).toHaveLength(2)

    const deselectIcon = screen.getByTitle(/borra la selección/i)

    expect(deselectIcon).toBeVisible()

    await userEvent.click(deselectIcon)

    expect(screen.queryByText(/option search/i)).not.toBeInTheDocument()
    expect(dropdownHeader).toHaveTextContent(/placeholder/i)
    expect(mockedOnValueChange).toHaveBeenCalledWith(undefined)
  })

  it('a click outside the dropdown closes its menu', async () => {
    render(<Dropdown options={mockOptions} />)

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(screen.queryByText(/option 1/i)).not.toBeInTheDocument()

    await userEvent.click(dropdownHeader)
    expect(screen.getByText(/option 1/i)).toBeVisible()

    await userEvent.click(document.body)
    expect(screen.queryByText(/option 1/i)).not.toBeInTheDocument()
  })

  it('passes selected option to parent via onChange', async () => {
    render(<MockParent />)
    const dropdownHeader = screen.getByTestId('dropdown-header')
    await userEvent.click(dropdownHeader)

    const optionToSelect = screen.getByTestId('2')
    await userEvent.click(optionToSelect)

    await waitFor(() => {
      expect(screen.getByTestId('selected-value')).toHaveTextContent(
        /option 2/i
      )
    })
  })
})
