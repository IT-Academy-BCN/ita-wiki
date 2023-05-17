import { screen } from '@testing-library/react'
import { render } from '../test-utils'
import { Home } from '../../pages'

describe('Home page', () => {
  it('Renders correctly', () => {
    render(<Home />)

    expect(screen.getByLabelText('Buscar')).toBeInTheDocument()
    expect(screen.getByText('¿Cómo colaborar en la wiki?')).toBeInTheDocument()
    expect(screen.getByText('Recursos que te gustan')).toBeInTheDocument()
    expect(screen.getByText('Tus recursos')).toBeInTheDocument()

    expect(screen.getByText(/vota los recursos/i)).toBeInTheDocument()
    expect(
      screen.getByText(/¡Bienvenid@ a la wiki de la IT Academy!/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Funcionalidades básicas que te ofrece esta plataforma/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Para comenzar a visualizar recursos, selecciona una categoría/i
      )
    ).toBeInTheDocument()
  })
})
