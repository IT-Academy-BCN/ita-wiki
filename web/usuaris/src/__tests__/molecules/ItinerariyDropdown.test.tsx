import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { ItineraryDropdown } from '../../components/molecules'
import { server } from '../../__mocks__/server'
import { errorHandlers } from '../../__mocks__/handlers'

const mockHandleClick = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
  server.resetHandlers()
})

describe('ItineraryDropdown', () => {
  it('renders correctly', async () => {
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()
  })

  it('renders all itineraries with logo and returns selected option to parent', async () => {
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)
    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())

    const dropdownHeader = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdownHeader)

    await waitFor(() =>
      expect(screen.getByText('Frontend React')).toBeVisible()
    )

    const reactLogo = screen.getByAltText('Frontend React')
    expect(reactLogo).toBeInTheDocument()

    fireEvent.click(reactLogo)

    expect(dropdownHeader).toHaveTextContent('Frontend React')
    expect(mockHandleClick).toHaveBeenCalledWith({
      id: '1',
      name: 'Frontend React',
      slug: 'react',
    })
  })

  it('renders correctly on error', async () => {
    server.use(...errorHandlers)
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText('Hi ha hagut un error...')).toBeInTheDocument()
    })
  })
})
