import { fireEvent, screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Home } from '../../pages'

describe('Home page', () => {
  it('Renders correctly', () => {
    render(<Home />)

    expect(screen.getByText(/vota los recursos/i)).toBeInTheDocument()
    expect(
      screen.getByText(/¡Bienvenid@ a la wiki de la IT Academy!/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Funcionalidades básicas que te ofrece esta plataforma:/)
    ).toBeInTheDocument()
  })

  it('shows signup button if user is not logged', () => {
    render(<Home />)

    expect(screen.getByText(/entrar/i)).toBeInTheDocument()
  })

  it('shows signup modal when user clicked', () => {
    render(<Home />)

    fireEvent.click(screen.getByText(/registrarme/i))
    const modalTitle = screen.getByText(/registro/i)
    expect(modalTitle).toBeInTheDocument()
  })
})
