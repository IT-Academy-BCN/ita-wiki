import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { RolFilter } from '../../components/molecules/RolFilter'
import { UserRole } from '../../types/types'

const mockHandleClick = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

describe('RolesFilter', () => {
  it('renders correctly', () => {
    render(<RolFilter handleRole={mockHandleClick} />)

    waitFor(() => expect(screen.getByText(/rol/i)).toBeInTheDocument())
  })

  it('renders RoleList options when dropdown is clicked', () => {
    render(<RolFilter handleRole={mockHandleClick} />)

    const dropdown = screen.getByTestId('dropdown')

    fireEvent.click(dropdown)

    const roleOptions = screen.getAllByTestId('dropdown')

    expect(roleOptions.length).toBeGreaterThan(0)
  })

  it('calls handleRole with the correct role when an option is clicked', () => {
    render(<RolFilter handleRole={mockHandleClick} />)

    const dropdown = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdown)

    const roleOption = screen.getByText(/ADMIN/i)

    fireEvent.click(roleOption)

    expect(mockHandleClick).toHaveBeenCalledWith({
      id: '1',
      name: 'Administrador',
      slug: UserRole.ADMIN,
    })
  })
})
