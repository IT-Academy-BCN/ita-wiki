import { render, waitFor, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from '../../__mocks__/server'
import Login from '../../components/organisms/Login'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const handleLogin = () => {}

describe('Login', () => {
  it('renders correctly', async () => {
    render(
      <BrowserRouter>
        <Login
          handleLoginModal={handleLogin}
          handleRegisterModal={handleLogin}
        />
      </BrowserRouter>
    )
  })

  it('logs in the user', async () => {
    render(
      <BrowserRouter>
        <Login
          handleLoginModal={handleLogin}
          handleRegisterModal={handleLogin}
        />
      </BrowserRouter>
    )
    userEvent.type(screen.getByLabelText(/dni/i), '45632452a')
    userEvent.type(screen.getByLabelText(/password/i), 'password')
    userEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
      expect(
        screen.queryByText('Identificador o contraseña incorrecto')
      ).not.toBeInTheDocument()
    })
  })

  it('should show an error message if login fails with 401 status', async () => {
    server.use(
      rest.post('http://localhost:8999/api/v1/auth/login', (req, res, ctx) =>
        res(ctx.status(401))
      )
    )
    render(
      <BrowserRouter>
        <Login
          handleLoginModal={handleLogin}
          handleRegisterModal={handleLogin}
        />
      </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/dni/i), '87654321b')
    userEvent.type(screen.getByLabelText(/password/i), 'wordpass')
    userEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(
        screen.getByText(/Identificador o contraseña incorrecto/i)
      ).toBeInTheDocument()
    })
  })
})
