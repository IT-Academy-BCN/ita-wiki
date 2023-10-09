import { useLocation } from 'react-router-dom'
import { Navbar } from '../../components/organisms/Navbar'
import { render, screen, fireEvent } from '../test-utils'

describe('Navbar', () => {
  it('renders Navbar component', () => {
    const location = useLocation();
    render(<Navbar />)

    const menuButton = screen.getByTestId('hamburger-menu')
    expect(menuButton).toBeInTheDocument()

    const menuItems = screen.getByTestId('menu-items')
    expect(menuItems).toBeInTheDocument()
    expect(menuItems).toHaveStyle('transform: translateX(-100%)')

    fireEvent.click(menuButton)
    expect(menuItems).toHaveStyle('transform: translateX(0)')

    fireEvent.click(menuButton)
    expect(menuItems).toHaveStyle('transform: translateX(-100%)')

    if (location.pathname !== '/') {
      const newPostButton = screen.getByTestId('new-post-button');
      expect(newPostButton).toBeInTheDocument();
      fireEvent.click(newPostButton);
    }

    const settingsButton = screen.getByTestId('settings-button')
    fireEvent.click(settingsButton)
  })
})
