import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Register from '../../components/organisms/Register'

const handleRegister = () => {}

describe('Register', () => {
  it('Register renders correctly', () => {
    render(
      <BrowserRouter>
        <Register
          handleLoginModal={handleRegister}
          handleRegisterModal={handleRegister}
          categories={[]}
        />
      </BrowserRouter>
    )
    expect(screen.getByText(/Registrarme/i)).toBeInTheDocument()
  })

  it('registers new users', async () => {
    render(
      <BrowserRouter>
        <Register
          handleLoginModal={handleRegister}
          handleRegisterModal={handleRegister}
          categories={[]}
        />
      </BrowserRouter>
    )
    userEvent.type(screen.getByTestId('DNI'), '123456')
    userEvent.type(screen.getByTestId('email'), 'email@email.com')
    userEvent.type(screen.getByTestId('name'), 'Jane Doe')
    userEvent.type(screen.getByLabelText('password'), 'password')
    userEvent.type(screen.getByLabelText('confirmPassword'), 'password')
    userEvent.type(screen.getByTestId('specialization'), 'specialization')

    const response = await axios.post(
      'http://localhost:8999/api/v1/auth/register'
    )

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
      expect(response.status).toEqual(204)
      expect(
        screen.queryByText('Este campo es obligatorio')
      ).not.toBeInTheDocument()
    })
  })
})
