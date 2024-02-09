import { render, screen } from '@testing-library/react'
import { Navbar } from '../../components/organisms'

describe('Navbar', () => {
  it('renders correctly', () => {
    render(<Navbar />)

    expect(screen.getByAltText('Login')).toBeInTheDocument()
    expect(screen.getByText('ESP')).toBeInTheDocument()
  })
})
