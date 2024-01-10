import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BackButton } from '../../components/molecules/BackButton'

const onClick = vi.fn()

describe('BackButton component', () => {
  it('renders correctly', () => {
    render(<BackButton onClick={onClick}>torna</BackButton>)
    const button = screen.getByRole('button', {
      name: /arrow_back_ios torna/i,
    })
    expect(button).toBeInTheDocument()
  })

  it('triggers navigation to the previous page on click event', async () => {
    render(<BackButton onClick={onClick} />)
    const button = screen.getByRole('button', {
      name: /arrow_back_ios/i,
    })
    fireEvent.click(button)
    await waitFor(() => {
      expect(onClick).toHaveBeenCalled()
    })
  })
})
