import { fireEvent, render, screen, waitFor, within } from '../test-utils'
import { FiltersWidget } from '../../components/organisms'
import { UserStatus } from '../../types'

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

    const itineraryDropdown = screen.getByTestId('itinerary-dropdown')

    const itineraryDropdownHeader =
      within(itineraryDropdown).getByTestId('dropdown-header')

    expect(itineraryDropdownHeader).toHaveTextContent(/especialitat/i)

    fireEvent.click(itineraryDropdownHeader)

    const reactOption = screen.getByTestId('1')
    expect(reactOption).toBeInTheDocument()

    fireEvent.click(reactOption)

    expect(itineraryDropdown).toHaveTextContent('Frontend React')
    expect(screen.queryByText(/especialitat/i)).not.toBeInTheDocument()

    expect(mockSetFilters).toHaveBeenCalledWith({
      itinerarySlug: 'react',
    })
  })

  it('deletes itinerary deselected and sends other filters to parent', async () => {
    render(
      <FiltersWidget
        filters={{ status: UserStatus.ACTIVE }}
        setFilters={mockSetFilters}
      />
    )

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )


    const itineraryDropdown = screen.getByTestId('itinerary-dropdown')

    const itineraryDropdownHeader =
      within(itineraryDropdown).getByTestId('dropdown-header')

    expect(itineraryDropdownHeader).toHaveTextContent(/especialitat/i)


    fireEvent.click(itineraryDropdownHeader)

    const reactOption = screen.getByTestId('1')
    expect(reactOption).toBeInTheDocument()

    fireEvent.click(reactOption)

    expect(itineraryDropdownHeader).toHaveTextContent('Frontend React')

    expect(mockSetFilters).toHaveBeenCalledWith({
      itinerarySlug: 'react',
      status: UserStatus.ACTIVE,
    })

    const deselectReact = within(itineraryDropdownHeader).getByTestId(
      'deselect-1'
    )

    fireEvent.click(deselectReact)

    expect(mockSetFilters).toHaveBeenCalledWith({
      status: UserStatus.ACTIVE,
    })
  })

  it('shows status selected in dropdown and sends it to parent', async () => {
    render(<FiltersWidget filters={{}} setFilters={mockSetFilters} />)

    const statusDropdown = screen.getByTestId('status-dropdown')

    const statusDropdownHeader =
      within(statusDropdown).getByTestId('dropdown-header')

    expect(statusDropdownHeader).toHaveTextContent(/estat/i)

    fireEvent.click(statusDropdownHeader)

    const activeOption = screen.getByTestId('ACTIVE')
    expect(activeOption).toBeInTheDocument()

    fireEvent.click(activeOption)

    expect(statusDropdownHeader).toHaveTextContent('Actiu')
    expect(screen.queryByText(/estat/i)).not.toBeInTheDocument()

    expect(mockSetFilters).toHaveBeenCalledWith({
      status: UserStatus.ACTIVE,
    })
  })

  it('deletes status deselected and sends other filters to parent', () => {
    render(
      <FiltersWidget
        filters={{ itinerarySlug: 'frontend-react' }}
        setFilters={mockSetFilters}
      />
    )

    const statusDropdown = screen.getByTestId('status-dropdown')

    const statusDropdownHeader =
      within(statusDropdown).getByTestId('dropdown-header')

    expect(statusDropdownHeader).toHaveTextContent(/estat/i)

    fireEvent.click(statusDropdownHeader)

    const activeOption = screen.getByTestId('ACTIVE')
    expect(activeOption).toBeInTheDocument()

    fireEvent.click(activeOption)

    expect(statusDropdownHeader).toHaveTextContent('Actiu')

    expect(mockSetFilters).toHaveBeenCalledWith({
      itinerarySlug: 'frontend-react',
      status: UserStatus.ACTIVE,
    })

    fireEvent.click(statusDropdownHeader)

    const deselectActive =
      within(statusDropdownHeader).getByTestId('deselect-ACTIVE')

    fireEvent.click(deselectActive)

    expect(mockSetFilters).toHaveBeenCalledWith({
      itinerarySlug: 'frontend-react',
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
        filters={{ status: UserStatus.ACTIVE }}
        setFilters={mockSetFilters}
      />
    )

    const searchBar = screen.getByPlaceholderText(/Cercar/i)
    fireEvent.change(searchBar, { target: { value: 'marc' } })

    waitFor(() =>
      expect(mockSetFilters).toHaveBeenCalledWith({
        status: UserStatus.ACTIVE,
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
        filters={{ status: UserStatus.ACTIVE }}
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
