import { render, screen } from '@testing-library/react'
import { colors } from '@itacademy/ui'
import { DateRange, type TDateRange } from '../../components/molecules'

const TestDateRangeProps: TDateRange = {
  labelStartDate: 'Initial date',
  labelEndDate: 'Final date',
  placeholderStartDate: 'From...',
  placeholderEndDate: 'To...',
  dateFormat: 'dd/MM/yyyy',
  calendarLanguage: 'en-IN',
}
describe('DateRange', () => {
  it('renders correctly', () => {
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
  })
})
