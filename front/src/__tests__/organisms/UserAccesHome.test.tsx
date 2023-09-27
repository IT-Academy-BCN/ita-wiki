import { render, screen, fireEvent, waitFor } from '../test-utils'
import { UserAccessHome } from '../../components/organisms'

describe('UserAccessHome component', () => {
  it('renders correctly', () => {
    render(<UserAccessHome />)

    expect(
      screen.getByText(
        "Registra't o inicia sessió per poder pujar i votar recursos"
      )
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Registrar-me' })
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
