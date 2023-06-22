import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { StatusFilterWidget } from '../../components/molecules'

const onChangeStatusFilter = vi.fn()

describe('StatusFilterWidget', () => {
  it('renders component correctly', () => {
    render(<StatusFilterWidget handleStatusFilter={onChangeStatusFilter} />)

    expect(screen.getByText('Estado')).toBeInTheDocument()
    expect(screen.getByLabelText('Por ver')).toBeInTheDocument()
    expect(screen.getByLabelText('Vistos')).toBeInTheDocument()
  })

  it('should raise an onChange event and get the checkbox and its value', async () => {
    render(<StatusFilterWidget handleStatusFilter={onChangeStatusFilter} />)

    const checkBoxA = screen.getByLabelText('Por ver')
    const checkBoxB = screen.getByLabelText('Vistos')

    expect(checkBoxA).toBeChecked()
    expect(checkBoxB).toBeChecked()

    fireEvent.click(checkBoxA)

    await waitFor(() =>
      expect(onChangeStatusFilter).toHaveBeenCalledWith('NOT_SEEN', false)
    )

    fireEvent.click(checkBoxB)

    await waitFor(() =>
      expect(onChangeStatusFilter).toHaveBeenCalledWith('SEEN', false)
    )

    fireEvent.click(checkBoxA)

    await waitFor(() =>
      expect(onChangeStatusFilter).toHaveBeenCalledWith('NOT_SEEN', true)
    )

    expect(onChangeStatusFilter).toHaveBeenCalledTimes(3)
  })
})
