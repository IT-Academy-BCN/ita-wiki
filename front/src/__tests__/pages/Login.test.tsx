import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { vi } from 'vitest'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { Login } from '../../pages'
import { paths } from '../../constants'

describe('Login', () => {
  it('should import all dependencies correctly', () => {
    expect(useForm).toBeDefined()
    expect(z).toBeDefined()
    expect(zodResolver).toBeDefined()
    expect(axios).toBeDefined()
    expect(paths).toBeDefined()
  })

  it('should submit the form correctly', async () => {
    const loginUser = vi.fn()
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('DNI o NIE'), {
      target: { value: '12345678P' },
    })
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => expect(loginUser).toHaveBeenCalledTimes(0))
  })

  it('should show validation errors if form is submitted with invalid data', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(
        screen.getByText('Identificador o contraseña incorrecto')
      ).toBeInTheDocument()
    })
  })
})
