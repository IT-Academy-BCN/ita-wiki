import { http, HttpResponse } from 'msw'
import { render, waitFor, screen, fireEvent } from '../test-utils'
import { server } from '../../__mocks__/server'
import { Login } from '../../components/organisms'
import { urls } from '../../constants'

const handleLogin = () => {}
const handleRegisterModal = () => {}

describe('Login', () => {
  it('renders correctly', async () => {
    render(
      <Login
        handleLoginModal={handleLogin}
        handleRegisterModal={handleRegisterModal}
      />
    )
  })

  it('logs in the user', async () => {
    render(
      <Login handleLoginModal={handleLogin} handleRegisterModal={handleLogin} />
    )
    fireEvent.change(screen.getByLabelText(/dni/i), {
      target: { value: '11111111A' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'testingPswd1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(
        screen.queryByText(/Identificador incorrecto/i)
      ).not.toBeInTheDocument()
    })
  })

  it('should show an error message if login fails', async () => {
    server.use(
      http.post(urls.logIn, () => HttpResponse.json(null, { status: 404 }))
    )
    render(
      <Login handleLoginModal={handleLogin} handleRegisterModal={handleLogin} />
    )

    fireEvent.change(screen.getByLabelText(/dni/i), {
      target: { value: '11111111' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'testingPswd1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(
        screen.getByText(/Identificador o contraseña incorrectos/i)
      ).toBeInTheDocument()
    })
  })
  it('show render done button on successful login', async () => {
    render(
      <Login handleLoginModal={handleLogin} handleRegisterModal={handleLogin} />
    )
    fireEvent.change(screen.getByLabelText(/dni/i), {
      target: { value: '11111111A' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'testingPswd1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByTestId('done-icon')).toBeInTheDocument()
    })
  })
})
