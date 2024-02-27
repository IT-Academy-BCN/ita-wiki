import { render, screen } from '@testing-library/react'
import { SelectGroup } from '../../components/molecules'
import { colors } from '../../styles'

describe('SelectGroup component', () => {
  it('renders correctly', () => {
    render(
      <SelectGroup
        id="testid"
        name="testname"
        label="test label"
        placeholder="test placeholder"
      />
    )

    const label = screen.getByText('test label')
    const select = screen.getByRole('combobox')

    expect(label).toBeInTheDocument()
    expect(select).toBeInTheDocument()
    expect(label).toHaveAttribute('for', select.id)
    expect(select).toHaveAttribute('name', 'testname')
    expect(screen.getByDisplayValue('test placeholder')).toBeInTheDocument()
  })

  it('renders correctly on error with error color and validation message', () => {
    render(
      <SelectGroup
        id="testid"
        name="testname"
        label="label"
        $error
        validationMessage="error message"
      />
    )

    const select = screen.getByRole('combobox')
    const message = screen.getByText('error message')

    expect(select).toBeInTheDocument()

    expect(select).toHaveStyle(`border: 1px solid ${colors.error};`)
    expect(message).toBeInTheDocument()
    expect(message).toBeVisible()
  })
})
