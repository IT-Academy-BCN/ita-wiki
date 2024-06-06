import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Mentors } from '../../pages'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import { UserRole } from '../../types'
import { paths } from '../../constants'

describe('Mentors page', () => {
  beforeEach(() => {
    vi.mock('../../context/AuthProvider', async () => {
      const actual = await vi.importActual('../../context/AuthProvider')
      return {
        ...actual,
        useAuth: vi.fn(),
      }
    })
  })

  it('renders correctly Mentors page if Admin user is logged in', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
      },
    } as TAuthContext)

    render(<Mentors />, { initialEntries: [paths.mentors] })

    expect(screen.getByTestId('test-mentors-page')).toBeInTheDocument()
  })
})
