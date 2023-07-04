import { render, waitFor, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from '../../__mocks__/server'
import Login from '../../components/organisms/Login'
import { urls } from '../../constants'

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
    userEvent.type(screen.getByLabelText(/dni/i), '11111111A')
    userEvent.type(screen.getByLabelText(/password/i), 'testingPswd1')
    userEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
      expect(
        screen.queryByText('Identificador o contraseña incorrecto')
      ).not.toBeInTheDocument()
    })
  })

  it('should show an error message if login fails', async () => {
    server.use(rest.post(urls.logIn, (req, res, ctx) => res(ctx.status(404))))
    render(
      <BrowserRouter>
        <Login
          handleLoginModal={handleLogin}
          handleRegisterModal={handleLogin}
        />
      </BrowserRouter>
    )

    userEvent.type(screen.getByLabelText(/dni/i), '87654321B')
    userEvent.type(screen.getByLabelText(/password/i), 'wordpass')
    userEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(screen.getByText(/Identificador incorrecto/i)).toBeInTheDocument()
      screen.debug()
    })
  })
})
