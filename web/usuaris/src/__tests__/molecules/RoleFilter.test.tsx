import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { RoleFilter } from '../../components/molecules/RoleFilter'
import { UserRole } from '../../types'
import { roles } from '../../constants'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const mockHandleClick = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual = await vi.importActual('../../context/AuthProvider')
    return {
      ...actual,
      useAuth: vi.fn(),
    }
  })
})

describe('RolesFilter', () => {
  it('renders correctly', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)

    render(<RoleFilter handleRole={mockHandleClick} />)

    waitFor(() => expect(screen.getByText(/rol/i)).toBeInTheDocument())
  })

  it('renders RoleList options when dropdown is clicked', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)

    render(<RoleFilter handleRole={mockHandleClick} />)

    const dropdown = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdown)

    const promises = roles.map((role) =>
      waitFor(() => screen.getByTestId(role.id))
    )

    await Promise.all(promises)
  })

  it('calls handleRole with the correct role when an option is clicked', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)

    render(<RoleFilter handleRole={mockHandleClick} />)

    const dropdown = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdown)

    const roleOption = screen.getByText(/ADMIN/i)

    fireEvent.click(roleOption)

    expect(mockHandleClick).toHaveBeenCalledWith({
      id: UserRole.ADMIN,
      name: 'Administrador',
      slug: UserRole.ADMIN,
    })
  })

  it('calls handleRole with the mentor role', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'MENTOR',
      },
    } as TAuthContext)

    render(<RoleFilter handleRole={mockHandleClick} />)

    const dropdown = screen.getByTestId('dropdown-header')

    expect(screen.getByText(/registrat/i)).toBeInTheDocument()
  })
})
