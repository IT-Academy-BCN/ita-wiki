import { render, screen, waitFor } from '@testing-library/react'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Input } from '../../components/atoms'
import { colors, dimensions } from '../../styles'

const onChangeMock = vi.fn()

describe('Input', () => {
  it('renders correctly', async () => {
    render(
      <Input
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
    render(<Input placeholder="error test" error />)
    const userInput = screen.getByPlaceholderText(/error test/i)
    expect(userInput).toHaveStyle(`border: 1px solid ${colors.error}`)
  })

  it('renders correctly with warning', () => {
    render(<Input placeholder="warning test" warning />)
    const userInput = screen.getByPlaceholderText(/warning test/i)
    expect(userInput).toHaveStyle(`border: 1px solid ${colors.warning}`)
  })

  it('renders correctly with success', () => {
    render(<Input placeholder="success test" success />)
    const userInput = screen.getByPlaceholderText(/success test/i)
    expect(userInput).toHaveStyle(`border: 1px solid ${colors.success}`)
  })

  it('renders with correct styles', () => {
    render(<Input placeholder="text input" error="false" />)
    const inputText = screen.getByPlaceholderText('text input')
    expect(inputText).toHaveStyle("width: '100%'")
    expect(inputText).toHaveStyle(`padding: ${dimensions.spacing.sm};`)
  })
})
