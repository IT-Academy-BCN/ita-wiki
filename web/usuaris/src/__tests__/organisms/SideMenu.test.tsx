import { render, screen } from '@testing-library/react'
import { SideMenu } from '../../components/organisms'

describe('SideMenu', () => {
  it('renders correctly', () => {
    render(<SideMenu />)

    expect(screen.getByAltText('IT Academy')).toBeInTheDocument()
    expect(screen.getByText('Usuari@s')).toBeInTheDocument()
    expect(screen.getByText('Mentores')).toHaveStyle('font-size: 0.875rem')
  })
})
