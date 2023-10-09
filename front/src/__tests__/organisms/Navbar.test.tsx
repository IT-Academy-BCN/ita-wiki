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
  })

  it('renders and changes language using the language dropdown in the Navbar', () => {
    render(<Navbar />)
  
    expect(screen.getByText('CAT')).toBeInTheDocument()
  
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'es' } })
  
    expect(screen.getByText('ES')).toBeInTheDocument()
  })

  it('does not render new-post-button nor access-modal on Homepage', () => {
    window.history.pushState({}, 'Home Page', '/')
    render(<Navbar />)
  
    const newPostButton = screen.queryByTestId('new-post-button')
    expect(newPostButton).not.toBeInTheDocument()

    const accessModal = screen.queryByTestId('access-modal')
    expect(accessModal).not.toBeInTheDocument()

    window.history.pushState({}, 'Original Page', '/')
  })

  it('renders the Navbar items on pages other than Homepage', () => {
    window.history.pushState({}, 'Category Page', '/category/react')
    render(<Navbar />)
    
    const menuItems = screen.queryAllByRole('button')
    expect(menuItems.length).toBeGreaterThan(0)
  })
})
