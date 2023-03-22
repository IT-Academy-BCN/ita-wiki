import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { InputText } from '../../components/atoms'
import { colors, dimensions } from '../../styles'

describe('InputText', () => {
  const onChangeMock = vi.fn()

  it('renders correctly', () => {
    render(
      <InputText
        placeholder="DNI o NIE"
        value="value test"
        id="id test"
        error="false"
        onChange={onChangeMock}
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

  it('onChange works correctly', () => {
    render(
      <InputText type="text" onChange={onChangeMock} defaultValue="12345678A" />
    )

    const input = screen.getByDisplayValue(/12345678a/i)

    fireEvent.change(input, { target: { value: 'Y12345678' } })

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('Y12345678')
  })

  it('renders correctly with error', () => {
    render(<InputText placeholder="error test" error onChange={onChangeMock} />)

    const userInput = screen.getByPlaceholderText(/error test/i)

    expect(userInput).toHaveStyle(`border: 1px solid ${colors.error}`)
  })

  it('renders with correct styles', () => {
    render(
      <InputText
        placeholder="text input"
        error="false"
        onChange={onChangeMock}
      />
    )

    const inputText = screen.getByPlaceholderText('text input')

    expect(inputText).toHaveStyle("width: '100%'")
    expect(inputText).toHaveStyle(`padding: ${dimensions.spacing.sm};`)
  })
})
