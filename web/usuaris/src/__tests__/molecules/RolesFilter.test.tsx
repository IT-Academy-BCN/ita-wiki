import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { RolFilter } from '../../components/molecules/RolFilter'
import { server } from '../../__mocks__/server'

const mockHandleClick = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
  server.resetHandlers()
})

describe('RolesFilter', () => {
  it('renders correctly', async () => {
    render(<RolFilter handleRole={mockHandleClick} />)

    await waitFor(() => expect(screen.getByText(/rol/i)).toBeInTheDocument())
  })

  it('renders RoleList options when dropdown is clicked', () => {
    render(<RolFilter handleRole={mockHandleClick} />)

    const dropdown = screen.getByTestId('dropdown')

    fireEvent.click(dropdown)

    const roleOptions = screen.getAllByTestId('dropdown-header')

    expect(roleOptions.length).toBeGreaterThan(0)
  })
})
