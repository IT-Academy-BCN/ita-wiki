import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
import { ItineraryDropdown } from '../../components/molecules'
import { server } from '../../__mocks__/server'
import { errorHandlers } from '../../__mocks__/handlers'
import { TAuthContext, useAuth } from '../../context/AuthProvider'

const mockHandleClick = vi.fn()

beforeEach(() => {
  vi.mock('../../context/AuthProvider', async () => {
    const actual = await vi.importActual('../../context/AuthProvider')
    return {
      ...actual,
      useAuth: vi.fn(),
    }
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  server.resetHandlers()
})

describe('ItineraryDropdown', () => {
  it('renders correctly', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )
    expect(screen.getByTitle(/obre/i)).toBeInTheDocument()
  })

  it('renders all itineraries with logo and returns selected option to parent', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())

    const dropdownHeader = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdownHeader)

    await waitFor(() =>
      expect(screen.getByText(/frontend react/i)).toBeVisible()
    )

    expect(screen.getByTitle(/tanca/i)).toBeInTheDocument()

    const reactLogo = screen.getByAltText(/frontend react/i)
    expect(reactLogo).toBeInTheDocument()

    fireEvent.click(reactLogo)

    expect(dropdownHeader).toHaveTextContent(/frontend react/i)
    expect(mockHandleClick).toHaveBeenCalledWith({
      id: '1',
      name: 'Frontend React',
      slug: 'react',
    })
  })

  it('should return undefined to parent when user deselects option', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())

    const dropdownHeader = screen.getByTestId('dropdown-header')

    fireEvent.click(dropdownHeader)

    await waitFor(() =>
      expect(screen.getByText(/frontend react/i)).toBeVisible()
    )

    const reactLogo = screen.getByAltText(/frontend react/i)

    fireEvent.click(reactLogo)

    expect(dropdownHeader).toHaveTextContent(/frontend react/i)

    expect(mockHandleClick).toHaveBeenCalledWith({
      id: '1',
      name: 'Frontend React',
      slug: 'react',
    })

    fireEvent.click(dropdownHeader)

    const deselectReact = screen.getAllByTestId('deselect-1')

    expect(deselectReact).toHaveLength(2)

    fireEvent.click(deselectReact[0])
    expect(dropdownHeader).toHaveTextContent(/especialitat/i)

    expect(mockHandleClick).toHaveBeenCalledWith(undefined)
  })

  it('renders correctly on error', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'ADMIN',
      },
    } as TAuthContext)
    server.use(...errorHandlers)
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)

    const spinnerComponent = screen.getByRole('status') as HTMLDivElement

    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => {
      expect(screen.getByText(/hi ha hagut un error.../i)).toBeInTheDocument()
    })
  })

  it('disables itinerary filter when user mentor is logged', async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: {
        dni: '12345678A',
        email: 'user@example.cat',
        role: 'MENTOR',
      },
    } as TAuthContext)

    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)

    await waitFor(() => {
      const dropdownItinerary = screen.getByTestId('dropdown-header')
      expect(dropdownItinerary).toBeInTheDocument()
      expect(dropdownItinerary).toBeDisabled()
    })
  })
})
