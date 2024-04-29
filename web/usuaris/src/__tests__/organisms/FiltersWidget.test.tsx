import { fireEvent, render, screen, waitFor } from '../test-utils'
import { FiltersWidget } from '../../components/organisms'

const mockHandleFilters = vi.fn()

describe('FiltersWidget', () => {
  it('renders correctly', async () => {
    render(<FiltersWidget filters={{}} handleFilters={mockHandleFilters} />)

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )
    expect(screen.getByAltText(/calendar/i)).toBeInTheDocument()
  })

  it('shows itinerary selected in dropdown and sends it to parent', async () => {
    render(<FiltersWidget filters={{}} handleFilters={mockHandleFilters} />)

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    expect(dropdownHeader).toHaveTextContent(/especialitat/i)

    fireEvent.click(dropdownHeader)

    const reactOption = screen.getByText('Frontend React')
    expect(reactOption).toBeInTheDocument()

    fireEvent.click(reactOption)

    expect(dropdownHeader).toHaveTextContent('Frontend React')
    expect(screen.queryByText(/especialitat/i)).not.toBeInTheDocument()

    expect(mockHandleFilters).toHaveBeenCalledWith({
      itinerarySlug: 'react',
    })
  })

  it('deletes itinerary deselected and sends other filters to parent', async () => {
    render(
      <FiltersWidget
        filters={{ status: 'ACTIVE' }}
        handleFilters={mockHandleFilters}
      />
    )

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )

    const dropdownHeader = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdownHeader)

    const reactOption = screen.getByText('Frontend React')
    expect(reactOption).toBeInTheDocument()

    fireEvent.click(reactOption)

    expect(dropdownHeader).toHaveTextContent('Frontend React')

    expect(mockHandleFilters).toHaveBeenCalledWith({
      itinerarySlug: 'react',
      status: 'ACTIVE',
    })

    fireEvent.click(dropdownHeader)

    const deselectReact = screen.getAllByTestId('deselect-1')

    fireEvent.click(deselectReact[0])

    expect(mockHandleFilters).toHaveBeenCalledWith({
      status: 'ACTIVE',
    })
  })

  it('displays search bar and updates filters value when typing', () => {
    render(<FiltersWidget filters={{}} handleFilters={mockHandleFilters} />)

    const searchBar = screen.getByPlaceholderText(/Cercar/i)
    expect(searchBar).toBeInTheDocument()

    fireEvent.change(searchBar, { target: { value: 'marc' } })

    waitFor(() =>
      expect(mockHandleFilters).toHaveBeenCalledWith({
        name: 'marc',
        dni: 'marc',
      })
    )
  })

  it('deletes search value when closing search and updates filters accordingly', () => {
    render(
      <FiltersWidget
        filters={{ status: 'ACTIVE' }}
        handleFilters={mockHandleFilters}
      />
    )

    const searchBar = screen.getByPlaceholderText(/Cercar/i)
    fireEvent.change(searchBar, { target: { value: 'marc' } })

    waitFor(() =>
      expect(mockHandleFilters).toHaveBeenCalledWith({
        status: 'ACTIVE',
        name: 'marc',
        dni: 'marc',
      })
    )

    const closeButton = screen.getByText(/close/i)
    fireEvent.click(closeButton)

    waitFor(() =>
      expect(mockHandleFilters).toHaveBeenCalledWith({
        status: 'ACTIVE',
      })
    )
  })

  it('updates filters value when introducing dates', () => {
    render(<FiltersWidget filters={{}} handleFilters={mockHandleFilters} />)

    const startDateInput = screen.getByPlaceholderText('De...')
    const endDateInput = screen.getByPlaceholderText('Fins...')

    const mockStartDate = new Date()
    const mockEndDate = new Date()

    fireEvent.change(startDateInput, { target: { value: mockStartDate } })
    fireEvent.change(endDateInput, { target: { value: mockEndDate } })

    waitFor(() =>
      expect(mockHandleFilters).toHaveBeenCalledWith({
        startDate: mockStartDate.toISOString(),
        endDate: mockEndDate.toISOString(),
      })
    )
  })

  it('deletes dates when closing dates inputs and updates filters accordingly', () => {
    render(
      <FiltersWidget
        filters={{ status: 'ACTIVE' }}
        handleFilters={mockHandleFilters}
      />
    )

    const startDateInput = screen.getByPlaceholderText('De...')
    const endDateInput = screen.getByPlaceholderText('Fins...')

    const mockStartDate = new Date()
    const mockEndDate = new Date()

    fireEvent.change(startDateInput, { target: { value: mockStartDate } })
    fireEvent.change(endDateInput, { target: { value: mockEndDate } })

    waitFor(() =>
      expect(mockHandleFilters).toHaveBeenCalledWith({
        status: 'ACTIVE',
        startDate: mockStartDate.toISOString(),
        endDate: mockEndDate.toISOString(),
      })
    )

    const closeIcon = screen.getByTestId('close-button-test')
    fireEvent.click(closeIcon)

    waitFor(() => {
      expect(mockHandleFilters).toHaveBeenCalledWith({
        status: 'ACTIVE',
      })
    })
  })
})
