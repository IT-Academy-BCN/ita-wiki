import { http, HttpResponse } from 'msw'
import { render, waitFor, screen, fireEvent } from '../test-utils'
import { server } from '../../__mocks__/server'
import { Login } from '../../components/organisms'
import { urls } from '../../constants'

describe('Login', () => {
  it('renders correctly', async () => {
    render(<Login />)

    expect(screen.getByTestId('login-test')).toBeInTheDocument()
    expect(screen.getByLabelText('dni')).toBeInTheDocument()
    expect(screen.getByLabelText('password')).toBeInTheDocument()
  })

  it('logs in the user', async () => {
    render(<Login />)

    fireEvent.change(screen.getByLabelText(/dni/i), {
      target: { value: '11111111A' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'testingPswd1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(
        screen.queryByText(/Identificador o contrasenya incorrectes/i)
      ).not.toBeInTheDocument()
    })
  })

  it('displays an error message if login fails', async () => {
    server.use(
      http.post(urls.logIn, () => HttpResponse.json(null, { status: 404 }))
    )

    render(<Login />)

    fireEvent.change(screen.getByLabelText(/dni/i), {
      target: { value: '11111111' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'testingPswd1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(
        screen.getByText(/Identificador o contrasenya incorrectes/i)
      ).toBeInTheDocument()
    })
  })

  it('displays done button on successful login', async () => {
    render(<Login />)

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
