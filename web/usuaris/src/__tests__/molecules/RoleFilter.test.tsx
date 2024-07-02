import { vi } from 'vitest'
import { I18nextProvider } from 'react-i18next'
import { fireEvent, render, renderHook, screen, waitFor } from '../test-utils'
import { RoleFilter } from '../../components/molecules/RoleFilter'
import { UserRole } from '../../types'
import { useRoles } from '../../hooks'
import { TAuthContext, useAuth } from '../../context/AuthProvider'
import i18n from '../../i18n'

const mockHandleClick = vi.fn()

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual = await vi.importActual('../../context/AuthProvider')
    return {
      ...actual,
      useAuth: vi.fn(),
    }
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('RolesFilter', () => {
  it('renders correctly', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
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
        role: UserRole.ADMIN,
      },
    } as TAuthContext)

    render(<RoleFilter handleRole={mockHandleClick} />)

    const { result } = renderHook(() => useRoles(), {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    })

    const dropdown = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdown)

    await waitFor(() => {
      result.current.roles.forEach((role) =>
        expect(screen.getByTestId(role.id)).toBeInTheDocument()
      )
    })
  })

  it('calls handleRole with the correct role when an option is clicked', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.ADMIN,
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

  it('disables roles filter when user mentor is logged', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: UserRole.MENTOR,
      },
    } as TAuthContext)

    render(<RoleFilter handleRole={mockHandleClick} />)

    const dropdownRole = screen.getByTestId('dropdown-header')
    expect(dropdownRole).toBeInTheDocument()
    expect(dropdownRole).toHaveTextContent(/registrat/i)
    expect(dropdownRole).toBeDisabled()
  })
})
