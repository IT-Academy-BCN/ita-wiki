import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Register } from '../../pages'
import { server } from '../../__mocks__/server'

describe('Register', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  it('Register renders correctly', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    expect(screen.getByText(/Registrarme/i)).toBeInTheDocument()
  })

  it('Should renders a message if any input is empty', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    userEvent.type(screen.getByTestId('DNI'), '123456')
    userEvent.type(screen.getByTestId('email'), 'email@email.com')
    userEvent.type(screen.getByTestId('name'), 'Jane Doe')
    userEvent.type(screen.getByLabelText('password'), 'password')
    userEvent.type(screen.getByLabelText('confirmPassword'), 'password')
    userEvent.type(screen.getByTestId('specialization'), 'specialization')

    userEvent.click(screen.getByText(/Registrarme/i))

    await waitFor(() => {
      expect(screen.getAllByText('El campo es requerido')).toBeDefined()
    })
  })

  it('Should register new users', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )

    userEvent.click(screen.getByText(/Registrarme/i))

    const response = await axios.post(
      'http://localhost:8999/api/v1/auth/register'
    )
    expect(response.data).toEqual([
      {
        email: 'user@example.com',
        password: 'stringst',
        name: 'string',
        dni: 'string',
      },
    ])
  })
})
