import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { StatusFilterWidget } from '../../components/molecules'

describe('StatusFilterWidget', () => {
  const onChangeStatusFilter = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders component correctly with all filters selected', () => {
    render(<StatusFilterWidget handleStatusFilter={onChangeStatusFilter} />)

    expect(screen.getByText(/estat/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/pendents/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/vistos/i)).toBeInTheDocument()

    expect(onChangeStatusFilter).toHaveBeenCalledTimes(2)
    expect(onChangeStatusFilter).toHaveBeenCalledWith(['NOT_SEEN', 'SEEN'])
  })

  it('clicking a checkbox removes/adds its value to the filter selection', async () => {
    render(<StatusFilterWidget handleStatusFilter={onChangeStatusFilter} />)

    const checkBoxA = screen.getByLabelText(/pendents/i)
    const checkBoxB = screen.getByLabelText(/vistos/i)

    expect(checkBoxA).toBeChecked()
    expect(checkBoxB).toBeChecked()

    fireEvent.click(checkBoxA)

    await waitFor(() =>
      expect(onChangeStatusFilter).toHaveBeenCalledWith(['SEEN'])
    )

    fireEvent.click(checkBoxB)

    await waitFor(() => expect(onChangeStatusFilter).toHaveBeenCalledWith([]))

    fireEvent.click(checkBoxA)

    await waitFor(() =>
      expect(onChangeStatusFilter).toHaveBeenCalledWith(['NOT_SEEN'])
    )

    expect(onChangeStatusFilter).toHaveBeenCalledTimes(5)
  })
})
