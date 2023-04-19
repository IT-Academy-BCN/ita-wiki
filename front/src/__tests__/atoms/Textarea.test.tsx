import { render, screen, waitFor } from '@testing-library/react'
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Textarea } from '../../components/atoms'
import { colors, dimensions } from '../../styles'

const onChangeMock = vi.fn()

describe('Textarea', () => {
  it('renders correctly', async () => {
    render(
      <Textarea
        data-testid="textarea"
        onChange={onChangeMock}
        rows={10}
        error="false"
      />
    )
    const userTextarea = screen.getByTestId('textarea')

    expect(userTextarea).toBeInTheDocument()

    userEvent.type(userTextarea, 'new value')

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled()
      expect(userTextarea).toHaveValue('new value')
    })
  })

  it('renders with correct styles', () => {
    render(<Textarea data-testid="textarea" rows={10} />)
    const textArea = screen.getByTestId('textarea')
    expect(textArea).toHaveStyle('width: 100%')
    expect(textArea).toHaveStyle(`border: 1px solid ${colors.gray.gray4}`)
    expect(textArea).toHaveStyle(
      `border-radius: ${dimensions.borderRadius.base}`
    )
    expect(textArea).toHaveStyle(`padding: ${dimensions.spacing.sm}`)
  })

  it('renders correctly with error', () => {
    render(<Textarea rows={10} data-testid="error-test" error />)
    const userTextarea = screen.getByTestId('error-test')
    expect(userTextarea).toHaveStyle(`border: 1px solid ${colors.error}`)
  })

  it('renders correctly with success', () => {
    render(<Textarea rows={10} data-testid="success-test" success />)
    const userTextarea = screen.getByTestId('success-test')
    expect(userTextarea).toHaveStyle(`border: 1px solid ${colors.success}`)
  })

  it('renders correctly with warning', () => {
    render(<Textarea rows={10} data-testid="warning-test" warning />)
    const userTextarea = screen.getByTestId('warning-test')
    expect(userTextarea).toHaveStyle(`border: 1px solid ${colors.warning}`)
  })
})
