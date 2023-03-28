import { render, screen } from '@testing-library/react'
import InputGroup from '../../components/molecules/InputGroup'

describe('InputGroupText', () => {
  it('renders correctly', () => {
    render(
      <InputGroup
        label="label"
        name="testname"
        id="testid"
        placeholder="text input"
      />
    )

    const label = screen.getByText('label')
    const input = screen.getByPlaceholderText('text input')

    expect(label).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'testid')
    expect(input).toHaveAttribute('id', 'testid')
    expect(input).toHaveAttribute('name', 'testname')
  })

  it('renders the error message', () => {
    render(
      <InputGroup
        id="testid"
        name="testname"
        label="label"
        error
        validationMessage="error message"
      />
    )
    expect(screen.getByText('error message')).toBeInTheDocument()
  })

  it('renders the icon correctly', () => {
    render(
      <InputGroup name="testname" label="test" id="testid" icon="test icon" />
    )
    expect(screen.getByText('test icon')).toBeInTheDocument()
  })
})
