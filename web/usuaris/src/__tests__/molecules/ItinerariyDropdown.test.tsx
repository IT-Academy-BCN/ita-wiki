import { vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../test-utils'
//import { screen, render, waitFor } from '@testing-library/react'
import { ItineraryDropdown } from '../../components/molecules'

const mockHandleClick = vi.fn()

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ItineraryDropdown', () => {
  it('renders correctly', async () => {
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)
    //render(<ItineraryDropdown handleItinerary={() => {}} />)

    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )
    expect(screen.getByTitle('Ampliar')).toBeInTheDocument()
  })

  it('renders itineraries list with logo and selects one option', async () => {
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)
    const spinnerComponent = screen.queryByTestId('spinner') as HTMLDivElement
    await waitFor(() => expect(spinnerComponent).toBeInTheDocument())

    await waitFor(() => expect(spinnerComponent).not.toBeInTheDocument())
    screen.debug()
    const dropdownHeader = screen.getByTitle('Ampliar')

    fireEvent.click(dropdownHeader)
    //expect(screen.getByText('Option 1')).toBeVisible()

    expect(screen.getByText('React')).toBeVisible()
    const reactLogo = screen.getByAltText('React')

    expect(reactLogo).toBeInTheDocument()

    fireEvent.click(reactLogo)

    expect(mockHandleClick).toHaveBeenCalledWith({
      id: '1',
      name: 'React',
      slug: 'react',
    })
  })

  it('renders correctly on error', async () => {
    render(<ItineraryDropdown handleItinerary={mockHandleClick} />)
  })
})
