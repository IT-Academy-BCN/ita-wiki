import userEvent from '@testing-library/user-event'
import Register from '../../components/organisms/Register'
import { render, screen, waitFor } from '../test-utils'

const handleRegister = () => {}

describe('Register', () => {
  it('Register renders correctly', () => {
    render(
      <Register
        handleLoginModal={handleRegister}
        handleRegisterModal={handleRegister}
      />
    )
    expect(screen.getByText(/Registrarme/i)).toBeInTheDocument()
  })

  it('registers new users', async () => {
    render(
      <Register
        handleLoginModal={handleRegister}
        handleRegisterModal={handleRegister}
      />
    )
    userEvent.type(screen.getByTestId('DNI'), '123456')
    userEvent.type(screen.getByTestId('email'), 'email@email.com')
    userEvent.type(screen.getByTestId('name'), 'Jane Doe')
    userEvent.type(screen.getByLabelText('password'), 'password')
    userEvent.type(screen.getByLabelText('confirmPassword'), 'password')
    userEvent.type(screen.getByTestId('specialization'), 'specialization')

    waitFor(() => {
      expect(screen.getByTestId('registerSuccess')).toBeInTheDocument()
    })
  })
})
