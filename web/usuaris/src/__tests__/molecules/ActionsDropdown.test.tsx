import { vi } from 'vitest'
import { fireEvent, render, screen, within } from '../test-utils'
import { ActionsDropdown } from '../../components/molecules'
import { UserStatus } from '../../types'

const mockHandleClick = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ActionsDropdown', () => {
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

  it('renders corresponding actions when users selected and returns selected action to parent', () => {
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

    const blockOption = screen.getByTestId('BLOCKED')
    expect(blockOption).toBeInTheDocument()
    expect(screen.getByTestId('DELETE')).toBeInTheDocument()

    fireEvent.click(blockOption)

    expect(actionsHeader).toHaveTextContent(/bloquejar/i)
    expect(mockHandleClick).toHaveBeenCalledWith(UserStatus.BLOCKED)
  })
})
