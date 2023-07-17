import { screen } from '@testing-library/react'
import { render } from '../test-utils';
import { CardProfile } from '../../components/molecules'

describe('CardProfile', () => {
  it('renders correctly with all given props', () => {  
    render(
      <CardProfile 
        img='/test-img.jpg'
        userName='test-name'
        email='test@test.com'
        contributions={3}
        votes={23}
        favorites={15}
      />
    )

    expect(screen.getByText(/perfil/i)).toBeInTheDocument()

    const image: HTMLImageElement = screen.getByAltText(/test-name's portrait/i)
    expect(image).toHaveAttribute('src', '/test-img.jpg')

    expect(screen.getByText(/test-name/i)).toBeInTheDocument()

    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument()

    const button: HTMLButtonElement = screen.getByRole('button')
    expect(button).toHaveTextContent(/cerrar sesión/i)

    expect(screen.getByText(3)).toBeInTheDocument()
    expect(screen.getByText(/aportaciones/i)).toBeInTheDocument()

    expect(screen.getByText(23)).toBeInTheDocument()
    expect(screen.getByText(/votos/i)).toBeInTheDocument()

    expect(screen.getByText(15)).toBeInTheDocument()
    expect(screen.getByText(/favoritos/i)).toBeInTheDocument()

    const volver: HTMLParagraphElement = screen.getByText(/volver/i)
    expect(volver).toBeInTheDocument()
  })
})