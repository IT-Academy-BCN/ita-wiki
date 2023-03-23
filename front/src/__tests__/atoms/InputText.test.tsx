import { render, screen, waitFor } from '@testing-library/react'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { InputText } from '../../components/atoms'
import { colors, dimensions } from '../../styles'

const onChangeMock = vi.fn()

describe('InputText', () => {
  it.only('renders correctly', async () => {
    render(
      <InputText
        placeholder="DNI o NIE"
        id="id test"
        error="false"
        onChange={onChangeMock}
      />
    )

    const userInput = screen.getByPlaceholderText('DNI o NIE')

    expect(userInput).toHaveAttribute('type', 'text')
    expect(userInput).toBeInTheDocument()

    userEvent.type(userInput, 'new value')

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled()
      expect(userInput).toHaveValue('new value')
    })
  })

  it('renders correctly with error', () => {
    render(<InputText placeholder="error test" error />)
    const userInput = screen.getByPlaceholderText(/error test/i)
    expect(userInput).toHaveStyle(`border: 1px solid ${colors.error}`)
  })

  it('renders with correct styles', () => {
    render(<InputText placeholder="text input" error="false" />)
    const inputText = screen.getByPlaceholderText('text input')
    expect(inputText).toHaveStyle("width: '100%'")
    expect(inputText).toHaveStyle(`padding: ${dimensions.spacing.sm};`)
  })
})
