import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Home } from '../../pages'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

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

  it('renders dashboard if user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)

    render(<Home />)

    const mainDiv = screen.getByRole('main')
    const sideMenuElement = screen.getByText(/Mentors/i)
    const filtersWidgetElement = screen.getByAltText(/Calendar/i)
    const actionsDropdown = screen.getByTestId('actions-dropdown')

    expect(mainDiv).toBeInTheDocument()
    expect(sideMenuElement).toBeInTheDocument()
    expect(filtersWidgetElement).toBeInTheDocument()
    expect(actionsDropdown).toBeInTheDocument()
  })
})
