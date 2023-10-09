import { Navbar } from '../../components/organisms/Navbar'
import { render, screen, fireEvent } from '../test-utils'

describe('Navbar', () => {
  it('renders Navbar component', () => {
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

    const settingsButton = screen.getByTestId('settings-button')
    fireEvent.click(settingsButton)
  });

  it('does not render new-post-button', () => {
    render(<Navbar />);
  
    const newPostButton = screen.queryByTestId('new-post-button');
    expect(newPostButton).not.toBeInTheDocument();
  });
})
