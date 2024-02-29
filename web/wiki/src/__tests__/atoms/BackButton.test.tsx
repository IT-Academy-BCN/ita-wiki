import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { BackButton } from '../../components/atoms/BackButton'

const navigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual: Record<number, unknown> = await vi.importActual(
    'react-router-dom'
  )
  return {
    ...actual,
    useNavigate: vi.fn(() => navigate),
  }
})

describe('BackButton component', () => {
  it('renders correctly', () => {
    render(<BackButton />)
    const button = screen.getByRole('button', {
      name: /arrow_back_ios torna/i,
    })
    expect(button).toBeInTheDocument()
  })

  it('triggers navigation to the previous page on click event', async () => {
    render(<BackButton />)
    const button = screen.getByRole('button', {
      name: /arrow_back_ios torna/i,
    })
    fireEvent.click(button)
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(-1)
    })
  })
})
