import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Home } from '../../pages'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { UserRole } from '../../types'

describe('Home page', () => {
  beforeEach(() => {
    vi.mock('../../context/AuthProvider', async () => {
      const actual = await vi.importActual('../../context/AuthProvider')
      return {
        ...actual,
        useAuth: vi.fn(),
      }
    })
  })

  it('renders Login if user is not logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as TAuthContext)

    render(<Home />)

    expect(screen.getByTestId('login-test')).toBeInTheDocument()
  })

  it('renders Dashboard if user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
      },
    } as TAuthContext)

    render(<Home />)

    expect(screen.getByTestId('dashboard-test')).toBeInTheDocument()
  })
})
