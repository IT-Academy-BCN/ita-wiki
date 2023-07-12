import { Navbar } from '../../components/organisms/Navbar'
import { render, screen, fireEvent } from '../test-utils'

describe('Navbar', () => {
  it('renders Navbar component', () => {
    render(<Navbar />)

    const menuButton = screen.getByAltText('menu')
    expect(menuButton).toBeInTheDocument()

    fireEvent.click(menuButton)

    const newPostButton = screen.getByTestId('newPostImage1')
    expect(newPostButton).toBeInTheDocument()

    fireEvent.click(newPostButton)


    const settingsButton = screen.getByTestId('settingsImage1')
    fireEvent.click(settingsButton)
  })
})
