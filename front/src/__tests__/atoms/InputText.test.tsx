import { render, screen } from '@testing-library/react'
import { InputText } from '../../components/atoms'
import { dimensions } from '../../theme'

describe('InputText', () => {
  beforeEach(() => {
    render(
      <InputText
        placeholder="text input"
        margin={dimensions.spacing.md}
        value="test"
      />
    )
  })

  it('renders content', () => {
    render(<InputText />)
    const userInput = screen.getByPlaceholderText('text input')
    expect(userInput).toHaveAttribute('type', 'text')
  })

  it('renders with correct styles', () => {
    const inputText = screen.getByPlaceholderText('text input')

    expect(inputText).toHaveStyle('width: 100%')
    expect(inputText).toHaveStyle(`margin: ${dimensions.spacing.md};`)
    expect(inputText).toHaveStyle(`border: ${dimensions.spacing.none};`)
  })
})
