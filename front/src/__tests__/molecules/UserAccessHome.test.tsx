import { render, screen, fireEvent, waitFor } from '../test-utils'
import { UserAccessHome } from '../../components/molecules'

describe('UserAccessHome component', () => {
  it('renders correctly', () => {
    render(<UserAccessHome />)

    expect(
      screen.getByText(
        'Regístrate o inicia sesión para poder subir y votar recursos'
      )
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Registrarme' })
    ).toBeInTheDocument()
  })

  it('shows register modal when user clicks its button', async () => {
    render(<UserAccessHome />)

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    const modalTitle = screen.getAllByText(/login/i)

    expect(modalTitle[0]).toBeVisible()

    await waitFor(() =>
      expect(
        screen.getByText('Recordar/cambiar contraseña')
      ).toBeInTheDocument()
    )
  })
})
