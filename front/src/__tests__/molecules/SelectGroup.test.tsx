import { render, screen } from '@testing-library/react'
import SelectGroup from '../../components/molecules/SelectGroup'

describe('SelectGroupText', () => {
  it('renders correctly', () => {
    render(
      <SelectGroup
        id="testid"
        name="testname"
        label="label"
        placeholder="placeholder"
      />
    )

    const label = screen.getByText('label')
    const select = screen.getByRole('combobox')

    expect(label).toBeInTheDocument()
    expect(select).toBeInTheDocument()
    expect(label).toHaveAttribute('for', select.id)
    expect(select).toHaveAttribute('name', 'testname')
  })

  it('renders the error message', () => {
    render(
      <SelectGroup
        id="testid"
        name="testname"
        label="label"
        error
        validationMessage="error message"
      />
    )
    expect(screen.getByText('error message')).toBeInTheDocument()
  })
})
