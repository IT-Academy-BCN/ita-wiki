import { vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { BackButton } from "../../components/atoms/BackButton"
import { waitFor } from '../test-utils'

const mockClick = vi.fn()
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

describe('BackButton', () => {
  it('renders correctly', () => {
    render(
      <BackButton onClick={ mockClick } />
    )
    const button = screen.getByText(/volver/i)
    expect(button).toBeInTheDocument()
  })

  it('triggers navigation to the previous page on click event', async () => {
    render(
      <BackButton onClick={ mockClick } />
    )
    const button = screen.getByText(/volver/i)
    fireEvent.click(button)
    await waitFor(() => {
    expect(navigate).toHaveBeenCalledWith(-1)
    })
  })
})