import { render, waitFor, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from '../../__mocks__/server'
import { Login } from '../../pages'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Login', () => {
  it('logs in the user', async () => {
    server.use(
      rest.post('http://localhost:8999/api/v1/auth/login', (req, res, ctx) =>
        res(ctx.status(204))
      )
    )
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    userEvent.type(screen.getByPlaceholderText('DNI o NIE'), '45632452a')
    userEvent.type(screen.getByLabelText('password'), 'password')
    userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(window.location.pathname).toBe('/')
  })

  it('should show an error message if login fails with 401 status', async () => {
    server.use(
      rest.post('http://localhost:8999/api/v1/auth/login', (req, res, ctx) =>
        res(ctx.status(401))
      )
    )

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    userEvent.type(screen.getByPlaceholderText('DNI o NIE'), '123456')
    userEvent.type(screen.getByLabelText('password'), 'password')
    userEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(
        screen.getByText('Identificador o contraseña incorrecto')
      ).toBeInTheDocument()
    })
  })
})
