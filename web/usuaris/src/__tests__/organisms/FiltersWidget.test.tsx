import { fireEvent, render, screen, waitFor } from '../test-utils'
import { FiltersWidget } from '../../components/organisms'

const mockSetFilters = vi.fn()

describe('FiltersWidget', () => {
  it('renders correctly', async () => {
    render(<FiltersWidget filters={{}} setFilters={mockSetFilters} />)

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )
    expect(screen.getByAltText(/calendar/i)).toBeInTheDocument()
  })

  it('shows itinerary selected in dropdown and sends it to parent', async () => {
    render(<FiltersWidget filters={{}} setFilters={mockSetFilters} />)

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )

    const allDropdowns = screen.getAllByTestId('dropdown-header')

    const dropdownHeader = allDropdowns[0]

    expect(dropdownHeader).toHaveTextContent(/especialitat/i)

    fireEvent.click(dropdownHeader)

    const reactOption = screen.getByText('Frontend React')
    expect(reactOption).toBeInTheDocument()

    fireEvent.click(reactOption)

    expect(dropdownHeader).toHaveTextContent('Frontend React')
    expect(screen.queryByText(/especialitat/i)).not.toBeInTheDocument()

    expect(mockSetFilters).toHaveBeenCalledWith({
      itinerarySlug: 'react',
    })
  })

  it('deletes itinerary deselected and sends other filters to parent', async () => {
    render(
      <FiltersWidget
        filters={{ status: 'ACTIVE' }}
        setFilters={mockSetFilters}
      />
    )

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )

    const allDropdowns = screen.getAllByTestId('dropdown-header')

    const dropdownHeader = allDropdowns[0]

    fireEvent.click(dropdownHeader)

    const reactOption = screen.getByText('Frontend React')
    expect(reactOption).toBeInTheDocument()

    fireEvent.click(reactOption)

    expect(dropdownHeader).toHaveTextContent('Frontend React')

    expect(mockSetFilters).toHaveBeenCalledWith({
      itinerarySlug: 'react',
      status: 'ACTIVE',
    })

    fireEvent.click(dropdownHeader)

    const deselectReact = screen.getAllByTestId('deselect-1')

    fireEvent.click(deselectReact[0])

    expect(mockSetFilters).toHaveBeenCalledWith({
      status: 'ACTIVE',
    })
  })

  it('displays search bar and updates filters value when typing', () => {
    render(<FiltersWidget filters={{}} setFilters={mockSetFilters} />)

    const searchBar = screen.getByPlaceholderText(/Cercar/i)
    expect(searchBar).toBeInTheDocument()

    fireEvent.change(searchBar, { target: { value: 'marc' } })

    waitFor(() =>
      expect(mockSetFilters).toHaveBeenCalledWith({
        name: 'marc',
        dni: 'marc',
      })
    )
  })

  it('deletes search value when closing search and updates filters accordingly', () => {
    render(
      <FiltersWidget
        filters={{ status: 'ACTIVE' }}
        setFilters={mockSetFilters}
      />
    )

    const searchBar = screen.getByPlaceholderText(/Cercar/i)
    fireEvent.change(searchBar, { target: { value: 'marc' } })

    waitFor(() =>
      expect(mockSetFilters).toHaveBeenCalledWith({
        status: 'ACTIVE',
        name: 'marc',
        dni: 'marc',
      })
    )

    const closeButton = screen.getByText(/close/i)
    fireEvent.click(closeButton)

    waitFor(() =>
      expect(mockSetFilters).toHaveBeenCalledWith({
        status: 'ACTIVE',
      })
    )
  })

  it('updates filters value when introducing dates', () => {
    render(<FiltersWidget filters={{}} setFilters={mockSetFilters} />)

    const startDateInput = screen.getByPlaceholderText('De...')
    const endDateInput = screen.getByPlaceholderText('Fins...')

    const mockStartDate = new Date()
    const mockEndDate = new Date()

    fireEvent.change(startDateInput, { target: { value: mockStartDate } })
    fireEvent.change(endDateInput, { target: { value: mockEndDate } })

    waitFor(() =>
      expect(mockSetFilters).toHaveBeenCalledWith({
        startDate: mockStartDate.toISOString(),
        endDate: mockEndDate.toISOString(),
      })
    )
  })

  it('deletes dates when closing dates inputs and updates filters accordingly', () => {
    render(
      <FiltersWidget
        filters={{ status: 'ACTIVE' }}
        setFilters={mockSetFilters}
      />
    )

    const startDateInput = screen.getByPlaceholderText('De...')
    const endDateInput = screen.getByPlaceholderText('Fins...')

    const mockStartDate = new Date()
    const mockEndDate = new Date()

    fireEvent.change(startDateInput, { target: { value: mockStartDate } })
    fireEvent.change(endDateInput, { target: { value: mockEndDate } })

    waitFor(() =>
      expect(mockSetFilters).toHaveBeenCalledWith({
        status: 'ACTIVE',
        startDate: mockStartDate.toISOString(),
        endDate: mockEndDate.toISOString(),
      })
    )

    const closeIcon = screen.getByTestId('close-button-test')
    fireEvent.click(closeIcon)

    waitFor(() => {
      expect(mockSetFilters).toHaveBeenCalledWith({
        status: 'ACTIVE',
      })
    })
  })
})
