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

    expect(screen.getByText('Estado')).toBeInTheDocument()
    expect(screen.getByLabelText('Por ver')).toBeInTheDocument()
    expect(screen.getByLabelText('Vistos')).toBeInTheDocument()

    expect(onChangeStatusFilter).toHaveBeenCalledTimes(1)
    expect(onChangeStatusFilter).toHaveBeenCalledWith(['NOT_SEEN', 'SEEN'])
  })

  it('clicking a checkbox removes/adds its value to the filter selection', async () => {
    render(<StatusFilterWidget handleStatusFilter={onChangeStatusFilter} />)

    const checkBoxA = screen.getByLabelText('Por ver')
    const checkBoxB = screen.getByLabelText('Vistos')

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

    expect(onChangeStatusFilter).toHaveBeenCalledTimes(4)
  })
})
