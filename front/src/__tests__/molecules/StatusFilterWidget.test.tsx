import { vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '../test-utils'
import { StatusFilterWidget } from '../../components/molecules'
import { FiltersProvider } from '../../context/store/context'

describe('StatusFilterWidget', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders component correctly with all filters selected', () => {
    render(
      <FiltersProvider>
        <StatusFilterWidget />
      </FiltersProvider>
    )

    expect(screen.getByText('Estado')).toBeInTheDocument()
    expect(screen.getByLabelText('Por ver')).toBeInTheDocument()
    expect(screen.getByLabelText('Vistos')).toBeInTheDocument()
  })

  it('clicking a checkbox removes/adds its value to the filter selection', async () => {
    render(
      <FiltersProvider>
        <StatusFilterWidget />
      </FiltersProvider>
    )

    const checkBoxA = screen.getByLabelText('Por ver')
    const checkBoxB = screen.getByLabelText('Vistos')

    expect(checkBoxA).toBeChecked()
    expect(checkBoxB).toBeChecked()

    fireEvent.click(checkBoxA)

    await waitFor(() => expect(checkBoxA).not.toBeChecked)
  })
})
