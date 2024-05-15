import { render, screen } from '@testing-library/react'
import { Navbar } from '../../components/organisms'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

describe('Navbar', () => {
  beforeEach(() => {
    vi.mock('../../context/AuthProvider', async () => {
      const actual = await vi.importActual('../../context/AuthProvider')
      return {
        ...actual,
        useAuth: vi.fn(),
      }
    })
  })
  it('renders correctly if user is not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<Navbar />)

    const ITALogo = screen.getByAltText(/IT Academy/i)
    const languageSelector = screen.getByText(/ES/i)

    expect(ITALogo).toBeInTheDocument()
    expect(languageSelector).toBeInTheDocument()
  })

  it('renders correctly if user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)

    render(<Navbar />)

    const languageSelector = screen.getByText(/ES/i)
    const userButton = screen.getByAltText(/User icon/i)

    expect(languageSelector).toBeInTheDocument()
    expect(userButton).toBeInTheDocument()
  })
})
