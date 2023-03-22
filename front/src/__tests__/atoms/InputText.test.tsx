import { render, screen } from '@testing-library/react'
import { InputText } from '../../components/atoms'
import { colors, dimensions } from '../../styles'

describe('InputText', () => {
  it('renders correctly', () => {
    render(
      <InputText
        placeholder="DNI o NIE"
        value="value test"
        id="id test"
        error="false"
      />
    )
    const userInput = screen.getByPlaceholderText('DNI o NIE')
    expect(userInput).toHaveAttribute('type', 'text')
    expect(userInput).toBeInTheDocument()
    expect(screen.getByDisplayValue('value test')).toHaveAttribute(
      'id',
      'id test'
    )
  })

  it('renders correctly with error', () => {
    render(<InputText placeholder="error test" error />)
    const userInput = screen.getByPlaceholderText(/error test/i)
    expect(userInput).toHaveStyle(`border: 1px solid ${colors.error}`)
  })

  it('renders with correct styles', () => {
    render(<InputText placeholder="text input" error="false" />)
    const inputText = screen.getByPlaceholderText('text input')

    expect(inputText).toHaveStyle('width: 100%')
    expect(inputText).toHaveStyle(`margin: ${dimensions.spacing.lg};`)
  })
})
