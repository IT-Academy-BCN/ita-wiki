import { vi } from 'vitest'
import { fireEvent, render, screen } from '../test-utils'
import { StatusDropdown } from '../../components/molecules'
import { UserStatus } from '../../types'

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

    const activeStatus = screen.getByTestId('ACTIVE')
    expect(activeStatus).toBeInTheDocument()
    expect(screen.getByText(/pendent/i)).toBeInTheDocument()
    expect(screen.getByText(/bloquejat/i)).toBeInTheDocument()

    fireEvent.click(activeStatus)

    expect(dropdownHeader).toHaveTextContent(/actiu/i)

    expect(mockHandleClick).toHaveBeenCalledWith(UserStatus.ACTIVE)
  })
})
