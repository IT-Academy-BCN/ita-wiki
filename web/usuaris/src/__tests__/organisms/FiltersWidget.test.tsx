import { fireEvent, render, screen, waitFor } from '../test-utils'
import { FiltersWidget } from '../../components/organisms'

describe('FiltersWidget', () => {
  it('renders correctly', async () => {
    render(<FiltersWidget />)

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )
    expect(screen.getByAltText(/calendar/i)).toBeInTheDocument()
  })

  it('shows itinerary selected in dropdown', async () => {
    render(<FiltersWidget />)

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
  })
})
