import { vi } from 'vitest'
import { fireEvent, render, screen } from '../test-utils'
import { HamburgerMenu } from '../../components/atoms'

const mockClick = vi.fn()

describe('HamburgerMenu', () => {
  it('renders correctly when open is false', () => {
    render(<HamburgerMenu open={false} onClick={mockClick} />)

    const burgerButton = screen.getByTestId('hamburger-menu')
    expect(burgerButton).toBeInTheDocument()

    // Verifica que los elementos div internos se rendericen correctamente
    const divElements = screen.getAllByTestId('hamburger-menu-item')
    expect(divElements).toHaveLength(3)

    // Verifica que los elementos div internos NO tienen la clase 'open'
    divElements.forEach((element) => {
      expect(element).not.toHaveClass('open')
    })
  })

  it('calls onClick when the HamburgerMenu is clicked', () => {
    render(<HamburgerMenu open={false} onClick={mockClick} />)

    const burgerButton = screen.getByTestId('hamburger-menu')

    // Simula el evento click en el botón
    fireEvent.click(burgerButton)

    // Verifica si mockClick ha sido llamado al menos una vez
    expect(mockClick).toHaveBeenCalled()
  })
})
