import { render, screen } from '@testing-library/react'
import { FiltersWidget } from '../../components/organisms'

describe('FiltersWidget', () => {
  it('renders correctly', () => {
    render(<FiltersWidget />)

    expect(screen.getByAltText(/calendar/i)).toBeInTheDocument()
  })
})
