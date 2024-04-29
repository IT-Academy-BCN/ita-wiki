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

    const allDropdowns = screen.getAllByTestId('dropdown-header')

    const dropdownHeader = allDropdowns[0]

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

    const allDropdowns = screen.getAllByTestId('dropdown-header')

    const dropdownHeader = allDropdowns[0]

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

  it('shows status selected in dropdown and sends it to parent', async () => {
    render(<FiltersWidget filters={{}} handleFilters={mockHandleFilters} />)

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )
    expect(screen.getByText(/estat/i)).toBeInTheDocument()

    const allDropdowns = screen.getAllByTestId('dropdown-header')

    const dropdownHeader = allDropdowns[1]

    expect(dropdownHeader).toHaveTextContent(/estat/i)

    fireEvent.click(dropdownHeader)

    const activeOption = screen.getByText('Actiu')
    expect(activeOption).toBeInTheDocument()

    fireEvent.click(activeOption)

    expect(dropdownHeader).toHaveTextContent('Actiu')
    expect(screen.queryByText(/estat/i)).not.toBeInTheDocument()

    expect(mockHandleFilters).toHaveBeenCalledWith({
      status: 'ACTIVE',
    })
  })

  it('deletes status deselected and sends other filters to parent', () => {
    render(
      <FiltersWidget
        filters={{ itinerarySlug: 'frontend-react' }}
        handleFilters={mockHandleFilters}
      />
    )

    expect(screen.getByText(/estat/i)).toBeInTheDocument()

    const allDropdowns = screen.getAllByTestId('dropdown-header')

    const dropdownHeader = allDropdowns[0]

    expect(dropdownHeader).toHaveTextContent(/estat/i)

    fireEvent.click(dropdownHeader)

    const statusOption = screen.getByText('Actiu')
    expect(statusOption).toBeInTheDocument()

    fireEvent.click(statusOption)

    expect(dropdownHeader).toHaveTextContent('Actiu')

    expect(mockHandleFilters).toHaveBeenCalledWith({
      itinerarySlug: 'frontend-react',
      status: 'ACTIVE',
    })

    fireEvent.click(dropdownHeader)

    const deselectActive = screen.getAllByTestId('deselect-ACTIVE')

    fireEvent.click(deselectActive[0])

    expect(mockHandleFilters).toHaveBeenCalledWith({
      itinerarySlug: 'frontend-react',
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
})
