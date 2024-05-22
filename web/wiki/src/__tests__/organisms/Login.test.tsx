import { http, HttpResponse } from 'msw'
import { render, waitFor, screen, fireEvent, act } from '../test-utils'
import { server } from '../../__mocks__/server'
import { Login } from '../../components/organisms'
import { urls } from '../../constants'

const loginProps = {
  handleLoginModal: () => {},
  handleRegisterModal: () => {},
}

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('Login', () => {
  it('renders correctly', async () => {
    render(<Login {...loginProps} />)

    expect(screen.getByLabelText('dni')).toBeInTheDocument()
    expect(screen.getByLabelText('password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()
  })

  it('logs in the user and shows done button', async () => {
    render(<Login {...loginProps} />)

    fireEvent.change(screen.getByLabelText(/dni/i), {
      target: { value: '11111111A' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'testingPswd1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(
        screen.queryByText(/Identificador o contrasenya incorrectes./i)
      ).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByTestId('done-icon')).toBeInTheDocument()
    })
  })

  it('should show an error message when dni is incorrect', async () => {
    render(<Login {...loginProps} />)

    fireEvent.change(screen.getByLabelText(/dni/i), {
      target: { value: '11111' },
    })

    fireEvent.blur(screen.getByLabelText(/dni/i))

    await waitFor(() => {
      expect(
        screen.getByText(/Identificador o contrasenya incorrectes./i)
      ).toBeInTheDocument()
    })
  })

  it('should show an error message when password is incorrect', async () => {
    render(<Login {...loginProps} />)

    fireEvent.change(screen.getByLabelText(/dni/i), {
      target: { value: '11111111A' },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'badpwd' },
    })

    fireEvent.blur(screen.getByLabelText(/password/i))

    await waitFor(() => {
      expect(
        screen.getByText(/Identificador o contrasenya incorrectes./i)
      ).toBeInTheDocument()
    })
  })

  it('should show an error message if login fails because user credentials are incorrect (error 401)', async () => {
    server.use(
      http.post(urls.logIn, () =>
        HttpResponse.json(
          {
            message: 'Error 401 - Credenciales incorrectas',
          },
          { status: 401 }
        )
      )
    )
    render(<Login {...loginProps} />)

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/dni/i), {
        target: { value: '99999999R' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'testingPswd1' },
      })
      fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    })

    await waitFor(() => {
      expect(
        screen.getByText(/Identificador o contrasenya incorrectes./i)
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByTestId('done-icon')).not.toBeInTheDocument()
    })
  })

  it('should show an error message if user is not active (error 403)', async () => {
    server.use(
      http.post(urls.logIn, () =>
        HttpResponse.json(
          {
            message: 'Error 403 - Acceso denegado (usuario no activo)',
          },
          { status: 403 }
        )
      )
    )

    render(<Login {...loginProps} />)

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/dni/i), {
        target: { value: '11111111A' },
      })
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: 'testingPswd1' },
      })
      fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    })

    await waitFor(() => {
      expect(
        screen.getByText(
          /Usuari en procés d'activació. Per favor, contacti amb l'administrador./i
        )
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.queryByTestId('done-icon')).not.toBeInTheDocument()
    })
  })
})
