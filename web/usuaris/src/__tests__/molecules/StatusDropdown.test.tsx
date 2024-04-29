import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { StatusDropdown } from '../../components/molecules'

const mockHandleClick = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

describe('StatusDropdown', () => {
  it('renders correctly', () => {
    render(<StatusDropdown handleStatus={mockHandleClick} />)

    expect(screen.getByText(/estat/i)).toBeInTheDocument()

    expect(screen.getByTitle(/obre/i)).toBeInTheDocument()
  })

  it('renders all status with icon and returns selected option to parent', async () => {
    render(<StatusDropdown handleStatus={mockHandleClick} />)

    const dropdownHeader = screen.getByTestId('dropdown-header')
    expect(dropdownHeader).toHaveTextContent(/estat/i)

    fireEvent.click(dropdownHeader)

    const activeStatus = screen.getByText(/actiu/i)
    expect(activeStatus).toBeInTheDocument()
    expect(screen.getByText(/pendent/i)).toBeInTheDocument()
    expect(screen.getByText(/bloquejat/i)).toBeInTheDocument()

    fireEvent.click(activeStatus)

    expect(dropdownHeader).toHaveTextContent(/actiu/i)
    const icon = screen.getByText('task_alt')
    expect(icon).toHaveAttribute('name', 'task_alt')
    expect(icon).toHaveClass('material-symbols-outlined')
    expect(icon).toBeVisible()

    expect(mockHandleClick).toHaveBeenCalledWith({
      id: 'ACTIVE',
      name: 'Actiu',
      icon: 'task_alt',
    })
  })

  it('should return undefined to parent when user deselects option', async () => {
    render(<StatusDropdown handleStatus={mockHandleClick} />)

    const dropdownHeader = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdownHeader)

    await waitFor(() => expect(screen.getByText(/pendent/i)).toBeVisible())

    const blockedStatus = screen.getByText(/bloquejat/i)

    fireEvent.click(blockedStatus)

    expect(dropdownHeader).toHaveTextContent(/bloquejat/i)

    expect(mockHandleClick).toHaveBeenCalledWith({
      id: 'BLOCKED',
      name: 'Bloquejat',
      icon: 'block',
    })

    fireEvent.click(dropdownHeader)

    const deselectBlockedStatus = screen.getAllByTestId('deselect-BLOCKED')

    expect(deselectBlockedStatus).toHaveLength(2)

    fireEvent.click(deselectBlockedStatus[0])

    expect(dropdownHeader).toHaveTextContent(/estat/i)

    expect(mockHandleClick).toHaveBeenCalledWith(undefined)
  })
})
