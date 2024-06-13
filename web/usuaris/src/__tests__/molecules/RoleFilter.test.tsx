import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { RoleFilter } from '../../components/molecules/RoleFilter'
import { UserRole } from '../../types'
import { roles } from '../../constants'

const mockHandleClick = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

beforeEach(() => {
  render(<RoleFilter handleRole={mockHandleClick} />)
})

describe('RolesFilter', () => {
  it('renders correctly', () => {
    waitFor(() => expect(screen.getByText(/rol/i)).toBeInTheDocument())
  })

  it('renders RoleList options when dropdown is clicked', async () => {
    const dropdown = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdown)

    const promises = roles.map((role) =>
      waitFor(() => screen.getByTestId(role.id))
    )

    await Promise.all(promises)
  })

  it('calls handleRole with the correct role when an option is clicked', () => {
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
})
