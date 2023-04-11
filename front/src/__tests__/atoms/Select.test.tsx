import { fireEvent, render, screen } from '@testing-library/react'
import { Select } from '../../components/atoms'

describe('Select', () => {
  it('renders correctly with default props', () => {
    render(<Select placeholder="Test Select" />)

    const select = screen.getByRole('combobox')

    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('')
    expect(select).toHaveTextContent('Test Select')
  })

  it('selecting an option should update the select value', () => {
    const options = [
      { value: '0', label: 'Especialidad' },
      { value: '1', label: 'React' },
      { value: '2', label: 'Angular' },
      { value: '3', label: 'Vue' },
      { value: '4', label: 'Node' },
      { value: '5', label: 'Java' },
      { value: '6', label: 'Fullstack' },
    ]

    render(<Select options={options} />)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } })

    expect(screen.getByDisplayValue('React')).toBeInTheDocument()
    expect(screen.getByText('Fullstack')).toBeInTheDocument()
  })
})
