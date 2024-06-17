import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor, within } from '../test-utils'
import { ActionsDropdown } from '../../components/molecules'
import { UserStatus } from '../../types'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

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

describe('ActionsDropdown', () => {
  vi.mocked(useAuth).mockReturnValue({
    user: {
      dni: '12345678A',
      email: 'user@example.cat',
      role: 'ADMIN',
    },
  } as TAuthContext)
  it('renders correctly', () => {
    render(
      <ActionsDropdown
        selectedStatus={undefined}
        handleAction={mockHandleClick}
        isActionFinished={false}
      />
    )
    const actionsDropdown = screen.getByTestId('actions-dropdown')

    expect(actionsDropdown).toHaveTextContent(/accions/i)
    expect(
      within(actionsDropdown).getByTestId('dropdown-header')
    ).toBeDisabled()
    expect(screen.getByTitle(/obre/i)).toBeInTheDocument()
  })

  it('renders corresponding actions when users selected "active" and returns selected action to parent', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)

    render(
      <ActionsDropdown
        selectedStatus={UserStatus.ACTIVE}
        handleAction={mockHandleClick}
        isActionFinished={false}
      />
    )

    const actionsHeader = screen.getByTestId('dropdown-header')

    expect(actionsHeader).toHaveTextContent(/accions/i)

    fireEvent.click(actionsHeader)

    waitFor(() => {
      const blockOption = screen.queryByTestId('BLOCKED')!
      expect(blockOption).toBeInTheDocument()
      expect(screen.queryByTestId('DELETE')).toBeInTheDocument()

      fireEvent.click(blockOption)
      expect(actionsHeader).toHaveTextContent(/bloquejar/i)
      expect(mockHandleClick).toHaveBeenCalledWith(UserStatus.ACTIVE)
    })
  })

  it('renders corresponding actions when users selected "pending" and returns selected action to parent', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)

    render(
      <ActionsDropdown
        selectedStatus={UserStatus.PENDING}
        handleAction={mockHandleClick}
        isActionFinished={false}
      />
    )

    const actionsHeader = screen.getByTestId('dropdown-header')

    expect(actionsHeader).toHaveTextContent(/accions/i)

    fireEvent.click(actionsHeader)

    waitFor(() => {
      const blockOption = screen.queryByTestId('BLOCKED')!
      expect(blockOption).toBeInTheDocument()
      expect(screen.queryByTestId('DELETE')).toBeInTheDocument()

      fireEvent.click(blockOption)
      expect(actionsHeader).toHaveTextContent(/bloquejar/i)
      expect(mockHandleClick).toHaveBeenCalledWith(UserStatus.PENDING)
    })
  })

  it('renders corresponding actions when users selected "blocked" and returns selected action to parent', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)

    render(
      <ActionsDropdown
        selectedStatus={UserStatus.BLOCKED}
        handleAction={mockHandleClick}
        isActionFinished={false}
      />
    )

    const actionsHeader = screen.getByTestId('dropdown-header')

    expect(actionsHeader).toHaveTextContent(/accions/i)

    fireEvent.click(actionsHeader)

    waitFor(() => {
      const blockOption = screen.queryByTestId('BLOCKED')!
      expect(blockOption).toBeInTheDocument()
      expect(screen.queryByTestId('DELETE')).toBeInTheDocument()

      fireEvent.click(blockOption)
      expect(actionsHeader).toHaveTextContent(/bloquejar/i)
      expect(mockHandleClick).toHaveBeenCalledWith(UserStatus.BLOCKED)
    })
  })

  it('mentor logged in user', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'MENTOR',
      },
    } as TAuthContext)

    render(
      <ActionsDropdown
        selectedStatus={UserStatus.ACTIVE}
        handleAction={mockHandleClick}
        isActionFinished={false}
      />
    )

    const actionsHeader = screen.getByTestId('dropdown-header')

    expect(actionsHeader).toHaveTextContent(/accions/i)

    fireEvent.click(actionsHeader)

    waitFor(() => {
      const blockOption = screen.queryByTestId('BLOCKED')!
      expect(blockOption).toBeInTheDocument()
      expect(screen.getByTestId('DELETE')).not.toBeInTheDocument()

      fireEvent.click(blockOption)

      expect(actionsHeader).toHaveTextContent(/bloquejar/i)
      expect(mockHandleClick).toHaveBeenCalledWith(UserStatus.BLOCKED)
      expect(actionsHeader).toHaveTextContent(/delete/i)
      expect(mockHandleClick).toHaveBeenCalledWith(/delete/i)
    })
  })
})
