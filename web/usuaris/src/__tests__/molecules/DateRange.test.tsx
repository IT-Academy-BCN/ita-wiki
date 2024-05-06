import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { colors } from '@itacademy/ui'
import { DateRange, type TDateRange } from '../../components/molecules'

const TestDateRangeProps: TDateRange = {
  labelStartDate: 'Initial date',
  labelEndDate: 'Final date',
  placeholderStartDate: 'From...',
  placeholderEndDate: 'To...',
  dateFormat: 'dd/MM/yyyy',
  calendarLanguage: 'en-IN',
  handleDates: vi.fn(),
}
describe('DateRange', () => {
  it('renders correctly and passes dates to parent', () => {
    render(<DateRange {...TestDateRangeProps} />)

    const calendarIcon = screen.getByAltText(/calendar/i)
    const startDateInput = screen.getByPlaceholderText(/from/i)
    const endDateInput = screen.getByPlaceholderText(/to/i)

    expect(calendarIcon).toBeInTheDocument()
    expect(startDateInput).toBeInTheDocument()
    expect(endDateInput).toBeInTheDocument()

    expect(startDateInput).toHaveStyle(
      `border-left: 1px solid ${colors.gray.gray4}`
    )
    expect(endDateInput).toHaveStyle(`color: ${colors.gray.gray3}`)

    const mockStartDate = '03/04/2024'
    const mockEndDate = '08/04/2024'

    fireEvent.change(startDateInput, { target: { value: mockStartDate } })
    fireEvent.change(endDateInput, { target: { value: mockEndDate } })

    expect(screen.getByTestId('close-button-test')).toBeInTheDocument()

    const mockHandleDates = vi.fn()

    waitFor(() => {
      expect(mockHandleDates).toHaveBeenCalledWith(mockStartDate, mockEndDate)
    })
  })

  it('deletes dates when close button is clicked and updates info passed to parent', () => {
    render(<DateRange {...TestDateRangeProps} />)

    const startDateInput = screen.getByPlaceholderText(/from/i)
    const endDateInput = screen.getByPlaceholderText(/to/i)

    const mockStartDate = '03/04/2024'
    const mockEndDate = '08/04/2024'

    fireEvent.change(startDateInput, { target: { value: mockStartDate } })
    fireEvent.change(endDateInput, { target: { value: mockEndDate } })

    expect(startDateInput).toHaveAttribute('value', '03/04/2024')
    expect(endDateInput).toHaveAttribute('value', '08/04/2024')

    const mockHandleDates = vi.fn()
    waitFor(() => {
      expect(mockHandleDates).toHaveBeenCalledWith(mockStartDate, mockEndDate)
    })

    const closeIcon = screen.getByTestId('close-button-test')
    fireEvent.click(closeIcon)

    waitFor(() => {
      expect(startDateInput).toHaveAttribute('value', '')
      expect(endDateInput).toHaveAttribute('value', '')
      expect(mockHandleDates).toHaveBeenCalledWith(null, null)
    })
  })
})
