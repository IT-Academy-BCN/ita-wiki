import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { StatusFilterWidget } from '../../components/molecules'

describe('StatusFilterWidget', () => {
  const onChangeStatusFilter = vi.fn()
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders component correctly with all filters selected', () => {
    render(
      <StatusFilterWidget
        handleStatusFilter={onChangeStatusFilter}
        statusName="Status"
        labelForSeen="Seen"
        labelForNotSeen="Not seen"
      />
    )

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByLabelText('Seen')).toBeInTheDocument()
    expect(screen.getByLabelText('Not seen')).toBeInTheDocument()

    expect(onChangeStatusFilter).toHaveBeenCalledTimes(1)
    expect(onChangeStatusFilter).toHaveBeenCalledWith(['NOT_SEEN', 'SEEN'])
  })

  it('clicking a checkbox removes/adds its value to the filter selection', async () => {
    render(
      <StatusFilterWidget
        handleStatusFilter={onChangeStatusFilter}
        statusName="Status"
        labelForSeen="Seen"
        labelForNotSeen="Not seen"
      />
    )

    const checkBoxA = screen.getByLabelText('Not seen')
    const checkBoxB = screen.getByLabelText('Seen')

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
