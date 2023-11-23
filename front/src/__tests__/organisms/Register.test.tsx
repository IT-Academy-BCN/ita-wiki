import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Register from '../../components/organisms/Register'
import { render, screen, waitFor } from '../test-utils'

describe('Register', () => {
  it('Register renders correctly', () => {
    const handleLoginModal = vi.fn()
    const handleRegisterModal = vi.fn()

    render(
      <Register
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
      />
    )
    expect(screen.getByText(/Registrar-me/i)).toBeInTheDocument()
  })

  it('calls handleLoginModal & handleRegisterModal when clicking on the login button', async () => {
    const handleLoginModal = vi.fn()
    const handleRegisterModal = vi.fn()

    render(
      <Register
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
      />
    )

    await userEvent.click(screen.getByTestId('haveAnAccountLink'))

    expect(handleLoginModal).toHaveBeenCalled()
    expect(handleRegisterModal).toHaveBeenCalled()
  })

  it('registers new users', async () => {
    const handleLoginModal = vi.fn()
    const handleRegisterModal = vi.fn()
    render(
      <Register
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
      />
    )
    await userEvent.type(screen.getByLabelText('dni'), '47163785P')
    await userEvent.type(screen.getByTestId('email'), 'email@email.com')
    await userEvent.type(screen.getByTestId('name'), 'Jane Doe')
    await userEvent.type(screen.getByLabelText('password'), 'password123AAAA')
    await userEvent.type(
      screen.getByLabelText('confirmPassword'),
      'password123AAAA'
    )
    await userEvent.selectOptions(
      screen.getByLabelText('specialization'),
      'React'
    )
    await userEvent.click(screen.getByTestId('accept'))

    await userEvent.click(screen.getByTestId('submitButton'))

    await waitFor(
      () => {
        expect(screen.getByTestId('registerSuccess')).toBeInTheDocument()
        expect(handleRegisterModal).toHaveBeenCalled()
      },
      { timeout: 5000 }
    )
  })

  it('shows validation messages', async () => {
    const handleLoginModal = vi.fn()
    const handleRegisterModal = vi.fn()
    render(
      <Register
        handleLoginModal={handleLoginModal}
        handleRegisterModal={handleRegisterModal}
      />
    )

    await userEvent.click(screen.getByTestId('submitButton'))

    await waitFor(() => {
      expect(screen.getAllByText(/Aquest camp és obligatori/i)).toHaveLength(4)
      expect(
        screen.getByText(/La contrasenya ha de coincidir/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Es necesario aceptar los términos legales/i)
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          /La contrasenya ha de contenir només lletres i números, mínim 8 caràcters, un número, una majúscula i una minúscula/i
        )
      ).toBeInTheDocument()
    })
  })
})
