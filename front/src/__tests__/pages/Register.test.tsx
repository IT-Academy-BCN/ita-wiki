import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Register } from '../../pages'
import { server } from '../../__mocks__/server'

describe('Register', () => {
  it('Register renders correctly', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    expect(screen.getByText(/Registrarme/i)).toBeInTheDocument()
  })

  it('Registers a new user', async () => {
    server.use(
      rest.post('http://localhost:8999/api/v1/auth/register', (req, res, ctx) =>
        res(ctx.status(204))
      )
    )
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    userEvent.type(screen.getByTestId('DNI'), '123456')
    userEvent.type(screen.getByTestId('email'), 'email@email.com')
    userEvent.type(screen.getByTestId('name'), 'Jane Doe')
    userEvent.type(screen.getByTestId('password'), 'password')
    userEvent.type(screen.getByTestId('confirmPassword'), 'password')
    userEvent.type(screen.getByTestId('specialization'), 'specialization')

    userEvent.click(screen.getByText(/Registrarme/i))

    await waitFor(() => {
      expect(screen.getByText('El campo es requerido')).toBeInTheDocument()
    })
  })
})
