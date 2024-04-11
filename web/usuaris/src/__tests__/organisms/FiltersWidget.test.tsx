import { render, screen, waitFor } from '../test-utils'
import { FiltersWidget } from '../../components/organisms'

describe('FiltersWidget', () => {
  it('renders correctly', async () => {
    render(<FiltersWidget />)

    await waitFor(() =>
      expect(screen.getByText(/especialitat/i)).toBeInTheDocument()
    )
    expect(screen.getByAltText(/calendar/i)).toBeInTheDocument()
  })
})
