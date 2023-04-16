import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { AccessModal } from '../../components/molecules'

describe('AccessModal', () => {
  const mockToggleModal = vi.fn()

  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <AccessModal isOpen toggleModal={mockToggleModal} />
      </BrowserRouter>
    )

    expect(screen.getByAltText('Lock Dynamic Icon')).toBeInTheDocument()
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Registrarme' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument()
  })

  it('should redirect to /register path when clicking the "Registrarme" button', async () => {
    render(
      <BrowserRouter>
        <AccessModal isOpen toggleModal={mockToggleModal} />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/register')
    })
  })

  it('should redirect to /login path when clicking the "Entrar" button', async () => {
    render(
      <BrowserRouter>
        <AccessModal isOpen toggleModal={mockToggleModal} />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login')
    })
  })
})
