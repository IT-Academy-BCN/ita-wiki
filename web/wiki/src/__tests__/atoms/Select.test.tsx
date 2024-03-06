import { fireEvent, render, screen } from '@testing-library/react'
import { Select } from '../../components/atoms'

describe('Select', () => {
  it('renders correctly', () => {
    render(<Select placeholder="Test Select" />)

    const select = screen.getByRole('combobox')

    expect(select).toBeInTheDocument()
    expect(select).toHaveTextContent('Test Select')
  })

  it('selecting an option should update the select value', () => {
    const options = [
      { value: '0', label: 'Especialidad', id: '0' },
      { value: '1', label: 'React', id: '1' },
      { value: '2', label: 'Angular', id: '2' },
      { value: '3', label: 'Vue', id: '3' },
      { value: '4', label: 'Node', id: '4' },
      { value: '5', label: 'Java', id: '5' },
      { value: '6', label: 'Fullstack', id: '6' },
    ]

    render(<Select options={options} />)

    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } })

    expect(screen.getByDisplayValue('React')).toBeInTheDocument()
    expect(screen.getByText('Fullstack')).toBeInTheDocument()
  })
})
